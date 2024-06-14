# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]
