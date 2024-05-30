# Brug en officiel Node.js runtime som et basisbillede
FROM node:16


WORKDIR /usr/src/app

# Kopier package.json og package-lock.json (hvis tilgængelig)
COPY package*.json ./

# Installer app afhængigheder
RUN npm install

# Bundt app-kildekoden
COPY . .

# Eksponér porten appen kører på
EXPOSE 3000

# Definer kommandoen til at køre appen
CMD ["npm", "start"]
