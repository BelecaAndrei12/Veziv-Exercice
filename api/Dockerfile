# Base image
FROM node:18

# Create be-app directory
WORKDIR /usr/src/be

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

#Production build
RUN npm run build

# Exposes services on port 3000
EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]