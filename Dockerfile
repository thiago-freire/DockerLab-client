FROM node:22-alpine AS base

FROM base AS deps

ENV NODE_ENV=development
ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]