FROM node:12.15.0-alpine

WORKDIR /

RUN pwd

COPY . .

RUN yarn install
RUN yarn build


EXPOSE 3000
CMD [ "yarn", "start:prod" ]