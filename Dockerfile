FROM node:12
WORKDIR /usr/src/black-clean-api
COPY ./package.json .
RUN npm install --only=prod