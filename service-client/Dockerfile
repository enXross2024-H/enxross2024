FROM node:20.14.0-alpine3.20

WORKDIR /service-client

COPY package.json /service-client/package.json

RUN yarn install

COPY . /service-client

CMD ["yarn", "dev"]
