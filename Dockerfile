FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally (if not already installed)
RUN npm install -g @angular/cli@15.2.10

RUN npm cache clean --force

# Install project dependencies
RUN npm install --force

# Copy the entire project to the container
COPY . .

# Build the Angular application for production
RUN ng build 

# Use a lightweight Nginx image to serve the Angular app
FROM nginx:latest

# Copy the built Angular app from the previous stage to Nginx's web root directory
COPY --from=build /app/dist/espritcollabfront /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx and serve the Angular app
CMD ["nginx", "-g", "daemon off;"]
