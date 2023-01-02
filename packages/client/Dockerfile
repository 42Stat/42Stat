FROM node:19-alpine3.16
RUN apk update && apk upgrade && yarn
RUN yarn create vite app --template react-ts
WORKDIR /app
EXPOSE 5173
ENTRYPOINT yarn && yarn dev
