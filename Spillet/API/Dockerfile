# Use the official Node.js image as base
FROM node:16 AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from the project root to the working directory
COPY ./Spillet/Web/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

# Build the application
RUN npm run build

# Production stage
FROM node:16-alpine AS production

# Set working directory
WORKDIR /app

# Copy built application from the base stage
COPY --from=base /app ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
