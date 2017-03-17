FROM node:6.9.4

RUN mkdir -p /usr/app/server
WORKDIR /usr/app

COPY . server
WORKDIR /usr/app/server
RUN npm install

RUN apt-get update && apt-get install -y
RUN apt-get install redis-server -y
RUN service redis-server stop -y

EXPOSE 3000

CMD ["npm", "start"]