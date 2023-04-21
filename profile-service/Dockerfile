FROM node:19

WORKDIR /usr/src/profile-service

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]