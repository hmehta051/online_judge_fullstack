# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Update the package index and install necessary dependencies
RUN apk update && \
    apk add --no-cache g++ openjdk11 python3

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 
EXPOSE 5174

# Command to run the server
CMD ["npm", "start"]
