FROM node:22-alpine

WORKDIR /usr/bin/client

COPY package.json package-lock.json ./ 

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000