FROM node:6.9.4

RUN mkdir -p /usr/app
WORKDIR /usr

COPY . app
WORKDIR /usr/app
RUN npm install nodemon -g
RUN npm install

# RUN apt-get update && apt-get install -y
# RUN apt-get install redis-server -y

# EXPOSE 6379

# RUN redis-server
# RUN service redis-server stop -y

EXPOSE 3000

CMD ["nodemon", "index.js"]