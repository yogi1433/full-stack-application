# Step 1: Build the React app
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve static files
FROM nginx:alpine

# Copy built files from the previous stage to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
