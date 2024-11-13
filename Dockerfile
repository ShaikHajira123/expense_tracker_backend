
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN chmod -R 755 /app
CMD ["npm", "run", "start:dev"]
