# Base image
FROM node:18

# Create fe-app directory
WORKDIR  /usr/src/fe

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g @angular/cli

# Bundle app source
COPY . .

#Build
RUN npm run build

# Expose services on port 4200
EXPOSE 4200



