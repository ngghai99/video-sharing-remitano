# Sử dụng một image base với Node.js
FROM node:21
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "dev"]
