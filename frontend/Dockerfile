FROM node:12-slim

WORKDIR /opt/frontend

RUN pwd

COPY . .

RUN yarn install


EXPOSE 4000
CMD [ "yarn", "start" ]