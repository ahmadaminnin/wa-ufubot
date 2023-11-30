FROM node:10-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD [ "node", "app.js" ]
