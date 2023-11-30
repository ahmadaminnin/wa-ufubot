FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "app.js" ]