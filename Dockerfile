FROM node:22-alpine

WORKDIR /usr/bin/client

COPY package.json package-lock.json ./ 

RUN npm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

EXPOSE 3000