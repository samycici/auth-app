FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3000

CMD nodemon --exec babel-node server/index.js
