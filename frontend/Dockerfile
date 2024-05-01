# Use an official lightweight Node.js image
FROM node:14.17.3 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend files
COPY . .

# Build the app
RUN npm run build

# Use an official nginx image
FROM nginx:alpine

# Copy the built app to nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
