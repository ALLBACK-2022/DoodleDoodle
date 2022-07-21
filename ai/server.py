"""
Flask Server with AI model
"""
from flask import Flask, request

import os, keras, numpy as np, os

from skimage.transform import resize
import matplotlib.pyplot as plt

from config import BUCKET_NAME
from connection import s3_connection, s3_get_object

app = Flask(__name__)

# Read class names
with open("ai-model/class_names.txt", "r") as ins:
  class_names = []
  for line in ins:
    class_names.append(line.rstrip('\n'))

# Load the model
model = keras.models.load_model('./ai-model/keras.h5')
# model.summary()

@app.route("/AI", methods=['POST'])
def index():
    
    if request.method =='POST':
        value = request.get_json()
        if not value:
            return ('No parameter', 400)
        #랜덤 단어와 이미지 url을 받아온다.
        s3 = s3_connection()
        os.mkdir('temp')
        filepath = str(value['draw-id']) + '.png'
        if s3_get_object(s3, BUCKET_NAME, 'drawimage/'+ filepath, 'temp/' + filepath):
            ranword = request.args.get('ranword')
            
            img = plt.imread('temp/' + filepath)
            img = img[:, :, 0]
            img = resize(img, (28, 28))

            for x in range(0, 28):
                for y in range(0, 28):
                    num = img[x][y] - 1
                    if num < 0:
                        num *= -1
                    img[x][y] = num

            pred = model.predict(np.expand_dims(img, axis=0))[0]
            ind = (-pred).argsort()[:] # all sequence with similarity sorted by highest.  
            otherResults={}
            result={}
            for x in range(0,len(ind)):
                if(class_names[ind[x]]==ranword):
                    result[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2))+'%'
                if x<5:
                    otherResults[ class_names[ind[x]] ] = str(round(pred[ind[x]]*100, 2)) + '%'

            otherResults['result'] = result

            os.remove('temp/' + filepath)
            return (otherResults, 200)
        return ("can't download file", 400)
    return ("error", 400)

if __name__ =='__main__':
    app.run(port=5001, debug=True)
