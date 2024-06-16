FROM node:16

# Install k6
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://get.k6.io | sh

# Install npm
RUN apt-get update && apt-get install -y npm

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose the port your server runs on
EXPOSE 3000

# Start the server and k6 in the background
CMD node server.js & k6 run --address 192.168.87.167:3000 load_test.js
