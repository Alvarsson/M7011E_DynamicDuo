FROM node:14-alpine

# Create app directory
#WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json /app/

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

#copy all code from my local to this container.
COPY . .

# we dont need to expose any port
# EXPOSE 8080

