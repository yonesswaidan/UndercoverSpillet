# Vælg en passende Node.js-baseret base image
FROM node:16

# Opret arbejdsområdet i Docker-containeren
WORKDIR /app

# Kopier package.json og package-lock.json
COPY package*.json ./

# Installer npm-afhængigheder
RUN npm install

# Kopier resten af appkoden
COPY . .

# Byg appen (hvis nødvendigt)
RUN npm run build

# Angiv standardkommandoen, når containeren starter
CMD ["node", "server.js"]
