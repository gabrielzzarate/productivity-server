FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ARG MONGO_HOST=mongodb://mongo:27017/datas
ENV MONGO_HOST ${MONGO_HOST}

EXPOSE 3000
CMD [ "npm", "start"]