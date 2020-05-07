FROM node:12-slim

WORKDIR /opt/backend

RUN pwd

COPY . .

RUN yarn install
RUN yarn build


EXPOSE 3000
CMD [ "yarn", "start:prod" ]