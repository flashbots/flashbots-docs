FROM node:16.17-alpine

WORKDIR /flashbots-docs

COPY package*.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "start", "--host", "0.0.0.0"]
