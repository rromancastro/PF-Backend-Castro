FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY .env .

RUN npm install --production

COPY . .

EXPOSE 8080

ENV NODE_ENV=production


CMD ["node", "src/app.js"]