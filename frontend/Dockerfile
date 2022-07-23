# Pull the image (and version) 
FROM node:16.13.1

# Install
WORKDIR /frontend
COPY . /frontend
RUN npm install
RUN npm install react-scripts
RUN npm install axios
RUN npm install react-web-share
RUN npm install html2canvas
#CMD ['node', 'server.js']
COPY . ./
# permission
# RUN chmod 777 node_modules

# Start 
CMD ["npm", "start"]


# docker build -t frontend-img .
# docker run --name frontend-con -it -p 3000:3000 --rm frontend-img
# docker run -v our-vol:/app --name frontend-con -it -p 3000:3000 --rm frontend-img
# docker network connect nginx nginx-con