# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install all the dependencies
RUN npm ci

# Copy source code of your app
COPY . .

# Build production app
RUN npm run build -- --configuration production

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/uniovi-robotics-workshop-frontend/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80