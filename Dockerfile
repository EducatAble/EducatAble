FROM node:8

# Create an environment variable for MongoDB URI
ENV MONGODB_URI='mongodb://localhost:27017/educatable'

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
