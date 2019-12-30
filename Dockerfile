FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i --production

EXPOSE ${PORT}

CMD ['npm', 'start']
