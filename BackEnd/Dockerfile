FROM node:lts-alpine

COPY . /app/
WORKDIR /app

RUN npm ci 

EXPOSE 8000

CMD [ "npm", "run", "dev" ]