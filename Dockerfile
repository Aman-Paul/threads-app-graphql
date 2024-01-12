FROM node:16

WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8000

CMD npm run dev