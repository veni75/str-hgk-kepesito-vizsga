FROM node:16-alpine3.11
WORKDIR "/app"

COPY package.json .
RUN npm i
COPY . .

CMD ["node", "src/index.js"]
