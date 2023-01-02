FROM node:19-alpine3.16
RUN apk update && apk upgrade && yarn
WORKDIR /app
EXPOSE 11900
ENTRYPOINT yarn && yarn dev
