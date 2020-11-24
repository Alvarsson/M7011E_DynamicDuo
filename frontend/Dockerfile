FROM mhart/alpine-node:12 
WORKDIR /app
COPY . .
RUN npm install react-scripts -g --silent
RUN yarn install


CMD ["yarn","start"]