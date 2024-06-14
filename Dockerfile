# Brug det officielle Node.js image som base
FROM node:16 AS base
WORKDIR /app
EXPOSE 3000

# Stage 1: Bygning af applikationen
FROM node:16 AS build
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Produktion
FROM node:16-alpine AS production
WORKDIR /app
COPY --from=build /src ./
RUN npm ci --only=production

# Start applikationen
CMD [ "node", "server.js" ]
