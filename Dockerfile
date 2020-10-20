FROM node:14.14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i --production

EXPOSE ${PORT}

CMD ["npm", "dev"]
