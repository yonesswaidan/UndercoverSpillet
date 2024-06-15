FROM node:16

# Install k6
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN apt-get update && apt-get install -y wget && \
    export K6_VERSION="0.35.0" && \
    wget https://github.com/loadimpact/k6/releases/download/v$K6_VERSION/k6-v$K6_VERSION-linux-amd64.tar.gz && \
    tar -zxvf k6-v$K6_VERSION-linux-amd64.tar.gz && \
    mv k6-v$K6_VERSION-linux-amd64/k6 /usr/local/bin/k6 && \
    chmod +x /usr/local/bin/k6 && \
    rm -rf k6-v$K6_VERSION-linux-amd64.tar.gz k6-v$K6_VERSION-linux-amd64

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to start the application
CMD ["node", "server.js"]
