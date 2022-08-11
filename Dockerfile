FROM node:14.18.1-alpine3.14

WORKDIR /code
COPY . /code

ARG API_HOST
ENV REACT_APP_API_HOST "$API_HOST"

RUN yarn && yarn build
