FROM node:14.4-alpine
WORKDIR /app
COPY ./package.json ./
COPY . .
RUN npm ci
CMD ["npm", "run", "start:prod"]
