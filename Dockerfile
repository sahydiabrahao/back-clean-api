FROM node:12
WORKDIR /usr/src/back-clean-api
COPY ./package.json .
RUN npm install --only=prod