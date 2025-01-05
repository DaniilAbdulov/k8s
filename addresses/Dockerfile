FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . ./

CMD ["sh", "-c", "node index.js"]

