# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .


# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]
