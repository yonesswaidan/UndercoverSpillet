# Brug det officielle Node.js image som base
FROM node:16 AS base
WORKDIR /app
EXPOSE 3001

# Bygning af applikationen
COPY ../../package*.json ./
RUN npm install
COPY ../../ ./
RUN npm run build

# Produktion
FROM node:16-alpine AS production
WORKDIR /app
COPY --from=base /app ./
RUN npm ci --only=production

# Start applikationen
CMD ["node", "server.js"]


