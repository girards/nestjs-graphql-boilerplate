FROM node:12-slim

WORKDIR /opt/frontend

RUN yarn global add serve
COPY . .

RUN yarn install


EXPOSE 4000
CMD [ "/opt/frontend/run" ]