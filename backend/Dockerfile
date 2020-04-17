FROM node:12-slim

WORKDIR /opt/app

RUN pwd

COPY . .

RUN yarn install
RUN yarn build


EXPOSE 3000
CMD [ "yarn", "start:prod" ]