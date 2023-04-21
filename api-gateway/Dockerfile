FROM node:19

WORKDIR /usr/src/api-gateway

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]