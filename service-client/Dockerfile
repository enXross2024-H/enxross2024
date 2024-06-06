FROM node:20.14.0-alpine3.20

WORKDIR /service-client

COPY package.json /service-client/package.json
COPY yarn.lock /service-client/yarn.lock

RUN yarn install

COPY . /service-client

CMD ["yarn", "dev"]
