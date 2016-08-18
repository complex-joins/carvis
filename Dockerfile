FROM node:latest

# Install app dependencies
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json /opt/app/
RUN npm install -qq
# ADD package.json /tmp/package.json
RUN npm i -gqq nodemon
# RUN cd /tmp && npm install -qq
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Create app directory

# Bundle app source
COPY . /opt/app/


EXPOSE 8000
CMD [ "npm", "start" ]
