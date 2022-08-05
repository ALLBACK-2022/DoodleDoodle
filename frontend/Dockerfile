# Pull the image (and version) 
FROM node:16.13.1
USER root

# Install
WORKDIR /frontend
COPY . /frontend
RUN npm install react-scripts
RUN npm install axios
RUN npm install react-loader-spinner
RUN npm install package.json
ARG API_URL
ENV REACT_APP_HOST_IP_ADDRESS $API_URL
# RUN npm install html2canvas
#CMD ['node', 'server.js']
COPY . ./
# permission
# RUN chmod 777 node_modules

# Start 
#RUN yarn --ignore-platform

CMD ["npm", "run", "build"]


# docker build -t frontend-img .
# docker run --name frontend-con -it -p 3000:3000 --rm frontend-img
# docker run -v our-vol:/app --name frontend-con -it -p 3000:3000 --rm frontend-img
# docker network connect nginx nginx-con