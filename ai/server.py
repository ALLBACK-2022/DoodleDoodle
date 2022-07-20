"""
Flask Server with AI model
"""
from flask import Flask, request

from tensorflow import keras
import cv2, numpy as np, os

from skimage.transform import resize
import matplotlib.pyplot as plt

from config import BUCKET_NAME
from connection import s3_connection, s3_get_object

app = Flask(__name__)

# Read class names
with open("./ai-model/class_names.txt", "r") as ins:
  class_names = []
  for line in ins:
    class_names.append(line.rstrip('\n'))

# Load the model
model = keras.models.load_model('./ai-model/keras.h5')
# model.summary()


@app.route("/AI", methods=['POST'])
def index():
    # predict()
    # if request.method =='GET':
    #     return render_template('index.html')
    if request.method =='POST':
        value = request.get_json()
        if not value:
            return ('No parameter', 400)
        #랜덤 단어와 이미지 url을 받아온다.
        s3 = s3_connection()
        filepath = str(value['game-id']) + '_' + str(value['draw-no']) + '.png'
        if s3_get_object(s3, BUCKET_NAME, 'drawimage/'+ filepath, 'temp/' + filepath):
        
            ranword = request.args.get('ranword')
            # for key in parameter_dict.keys():
                # ranword += value[key]
            # open a local image
            #img = cv2.imread('apple.png')
            # img = plt.imread('temp/' + filepath)
            img = plt.imread('temp/' + filepath)
            img = img[:, :, 0]
            img = resize(img, (28, 28))
            # img = cv2.resize(img, (28, 28))
            # img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            # img = img.reshape((28, 28, 1))
            # img = (255 - img) / 255
            # predict
            for x in range(0, 28):
                for y in range(0, 28):
                    num = img[x][y] - 1
                    if num < 0:
                        num *= -1
                    img[x][y] = num
                    
            pred = model.predict(np.expand_dims(img, axis=0))[0]
            ind = (-pred).argsort()[:] # all sequence with similarity sorted by highest.  
            # latex = [class_names[x] for x in ind]
            
            # for x in range(0, len(ind)):
                # print(class_names[ind[x]] + ':' + str(round(pred[ind[x]]*100, 2)) + '%')

            otherResults={}
            result={}
            for x in range(0,len(ind)):
                # result[ latex[x] ] = str(round(pred[ind[x]]*100, 2))+'%'
                if(class_names[ind[x]]==ranword):
                    result[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2))+'%'
                    # print('random의 해당 단어는'+latex[x]+'유사도는'+str(round(pred[ind[x]]*100, 2)) + '%')
                if x<5:
                    otherResults[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2)) + '%'
            
            otherResults['result'] = result
            
            os.remove('temp/' + filepath)
            return (otherResults, 200)
        return ("can't download file", 400)
    return ("error", 400)

if __name__ =='__main__':
    app.run(port=5001, debug=True)
