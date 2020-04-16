FROM node:10

WORKDIR /

RUN pwd

COPY . .

RUN yarn install
RUN yarn build


EXPOSE 3000
CMD [ "yarn", "start:prod" ]