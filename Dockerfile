# Brug en officiel Node.js runtime som et basisbillede
FROM node:16

# Opret en app mappe
WORKDIR /usr/src/app

# Kopier package.json og package-lock.json (hvis tilgængelig)
COPY package*.json ./

# Installer app afhængigheder
RUN npm install

# Hvis du bygger til produktion, brug:
# RUN npm ci --only=production

# Bundt app-kildekoden
COPY . .

# Eksponér porten appen kører på
EXPOSE 3000

# Definer kommandoen til at køre appen
CMD ["npm", "start"]
