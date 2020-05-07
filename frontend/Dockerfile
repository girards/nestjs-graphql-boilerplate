FROM node:12-slim

WORKDIR /usr/src/frontend

RUN yarn global add serve
COPY . .

RUN yarn install


EXPOSE 4000
CMD [ "/usr/src/frontend/run" ]