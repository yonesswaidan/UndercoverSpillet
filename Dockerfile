# Brug det officielle Node.js image
FROM node:16

# Opret og sæt arbejdsbiblioteket
WORKDIR /usr/src/app

# Kopier package.json og package-lock.json filer
COPY package*.json ./

# Installer afhængigheder
RUN npm install

# Kopier alle kildefiler til arbejdsbiblioteket
COPY . .

# Eksponér applikationsporten
EXPOSE 3000

# Start applikationen
CMD [ "node", "server.js" ]
