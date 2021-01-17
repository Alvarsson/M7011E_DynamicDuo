FROM node:14-alpine 
#download image and make it our own

# Create app directory
#WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json /app/

#Current work directory in the container.
WORKDIR /app

#Download nodemon, updates when change happens
RUN npm install -g nodemon

# Copy all local .json files into the container.
COPY package*.json ./

RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . .

EXPOSE 8080

