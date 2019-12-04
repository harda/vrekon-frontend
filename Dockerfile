FROM node:8.16.2-stretch-slim

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.16.2

COPY . /app

EXPOSE 4200
CMD ng server --host 0.0.0.0 --port 4200