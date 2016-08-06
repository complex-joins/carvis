FROM node:argon

# Install app dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /opt/app
ENV hello 'hello'
# Bundle app source
# COPY . /usr/src/app
ADD . /opt/app

EXPOSE 8000
CMD [ "npm", "start" ]
