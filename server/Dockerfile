# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
