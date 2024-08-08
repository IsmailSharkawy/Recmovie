FROM node:16-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 5100

CMD ["npm", "run", "server"]