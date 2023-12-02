# Stage 1: build
FROM node:20 AS development

WORKDIR /rr56/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 4200
