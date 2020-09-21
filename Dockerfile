FROM node:lts-alpine
COPY docker/entrypoint.sh /entrypoint.sh
RUN apk update & apk add yarn