FROM node:lts-alpine

COPY . /app/
WORKDIR /app

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]