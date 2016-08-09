FROM node:latest

# Install app dependencies
ADD package.json /tmp/package.json
RUN npm i -gqq nodemon
RUN npm install webpack -gqq
RUN cd /tmp && npm install -qq
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Create app directory
WORKDIR /opt/app

# Bundle app source
ADD . /opt/app

EXPOSE 8000
CMD [ "npm", "start" ]
