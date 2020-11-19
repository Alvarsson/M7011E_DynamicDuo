FROM node:14

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

COPY . .

EXPOSE 8080

