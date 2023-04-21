FROM node:19

WORKDIR /usr/src/authorization-service

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]