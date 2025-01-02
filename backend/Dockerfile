# Use a lightweight Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose the port your backend listens on
EXPOSE 5000

# Command to run the backend application
CMD ["node", "server.js"]
