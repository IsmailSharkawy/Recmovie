FROM node:16-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]