FROM node:21

WORKDIR /app

COPY package.json .

RUN npm i

COPY . ./

CMD ["node", "index.js"]