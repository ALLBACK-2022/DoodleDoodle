from tensorflow import keras    
import numpy as np
import cv2 #여기까지 model 관련 import
from flask import Flask, request, render_template, jsonify #flask 관련?
from flask_cors import CORS
import os
import pika

via = Flask(__name__)   #플라스크 생성 이름 via

print('RABBITMQ_DEFAULT_USER',os.environ.get("RABBITMQ_DEFAULT_USER"))
# RabbitMQ
 #rabbitMQ 관련 python 라이브러리
#credentials = pika.PlainCredentials(RABBITMQ_DEFAULT_USER,RABBITMQ_DEFAULT_PASS) #이게 일단 문제
credentials = pika.PlainCredentials(os.environ.get("RABBITMQ_DEFAULT_USER"),os.environ.get("RABBITMQ_DEFAULT_PASS"))
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq', 5672, '/', credentials))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)     #대기열 선언 task_quere
channel.queue_declare(queue='result_queue', durable=True)   #대기열 선언 result_queue

# CORS(app)
CORS(via, resources={r'*':{'origins': 'http://localhost:5002'}})

@via.route('/api') # Main
def main():
  return render_template('index.html')

result = []
url = []

#setResult??
def setResult(r,filename):
    global result
    result = r
    message = ''
    for i in result:
        message += str(i) + '-'
    message += filename
    # send receive    어디서 어디로 ?? 
    channel.basic_publish(exchange='',routing_key='result_queue',body=message,properties=pika.BasicProperties(
        delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE))
    print(" [x] Sent %r" % r)

#getResult
def getResult():
    return result

#####model part######
# Read class names
with open("./ai-model/class_names.txt", "r") as ins:
  class_names = []
  for line in ins:
    class_names.append(line.rstrip('\n'))

# Load the model
#model = keras.models.load_model('./ai-model/doodleNet-model.h5')
#model.summary()

#model code
def analysisDrawing():
    #랜덤 단어와 이미지 url또는 이미지을 받아온다.
        #ranword=''
        ranword='umbrella'
        
        # open a local image
        #img = cv2.imread('apple.png')
        img = cv2.imread('ai-model/umbrella.png')
        img = cv2.resize(img, (28, 28))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = img.reshape((28, 28, 1))
        img = (255 - img) / 255
        # predict
        pred = model.predict(np.expand_dims(img, axis=0))[0]
        ind = (-pred).argsort()[0:] # all sequence with similarity sorted by highest.  
        latex = [class_names[x] for x in ind] # latex is top 10 classname

        otherResults={}
        result={}
        for x in range(0,len(ind)):
            if(latex[x]==ranword):
                result[ latex[x] ] = str(round(pred[ind[x]]*100, 2))+'%'
                #print('random의 해당 단어는'+latex[x]+'유사도는'+str(round(pred[ind[x]]*100, 2)) + '%')
            if(x<5):
                otherResults[ latex[x] ] = str(round(pred[ind[x]]*100, 2)) + '%'
        
        otherResults['result'] = result

        print(otherResults)
        return otherResults
        #return (otherResults, 200)

#callback 왜 쓰이는 걸까 
def callback(ch, method, properties, body): #ch? method? properties?
    message = body.decode() #body는 어떤걸 의미? body에 메시지를 담아주는 건지, 어디에서?
    print("Received: ",message)
    ch.basic_ack(delivery_tag=method.delivery_tag) #??
    url = message.split("-")
    #r = calculateRatio(url)
    r = analysisDrawing() #model result
    setResult(r,url[2]) #r=result, url=filename

# receive task    
channel.queue_declare(queue='rpc_queue') #임시대기열?
def on_request(ch, method, props, body):
    message = body.decode()
    print("Received: ",message)
    #url = message.split("-")
    #result = calculateRatio(url)
    result = analysisDrawing()
    response = ''
    for i in result:
        response += str(i) + '-'
    response += url[2]
    print(" [.] Response:%s" % response)

    #큐에 미시지를 보낸다. properties 는 무엇을 의미?
    ch.basic_publish(exchange='',routing_key=props.reply_to,properties=pika.BasicProperties(correlation_id = props.correlation_id),body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)
print(" [x] Awaiting RPC requests")
channel.start_consuming() 

if __name__=="__main__":
    via.run(host="ai", port="5005", debug=True)