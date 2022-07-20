"""
Flask Server with AI model
"""
from flask import Flask, render_template, request
from requests import session

from tensorflow import keras
import numpy as np
import cv2
import runway

app = Flask(__name__)

# Read class names
with open("./ai-model/class_names2.txt", "r") as ins:
  class_names = []
  for line in ins:
    class_names.append(line.rstrip('\n'))

# Load the model
model = keras.models.load_model('./ai-model/doodleNet-model.h5')
#model.summary()
#model = keras.models.load_model('./ai-model/keras.h5')

@app.route("/AI", methods=['GET'])
def index():
    
    # if request.method =='GET':
    #     return render_template('index.html')
    if request.method =='GET':
        parameter_dict = request.args.to_dict() 
        if len(parameter_dict) == 0:
            return 'No parameter'
        #랜덤 단어와 이미지 url을 받아온다.
        ranword=''
        for key in parameter_dict.keys():
            ranword += request.args[key]
        # open a local image
        #img = cv2.imread('apple.png')
        img = cv2.imread('ai-model/rainbow.png')
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

        return (otherResults, 200)

if __name__ =='__main__':
    app.run(port=5001, debug=True)
