# Stage 1: Build the Angular app
FROM node:alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy a custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app files to the NGINX HTML folder
COPY --from=build /usr/src/app/dist/web-port-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
