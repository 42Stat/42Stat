FROM node:18-alpine
RUN apk update && apk upgrade && yarn
WORKDIR /app
EXPOSE 11900
ENTRYPOINT yarn && yarn dev
