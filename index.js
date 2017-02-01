var express = require('express'),
  app = express(),
  redis = require('redis'),
  client = redis.createClient(),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  controller = require('./app/controller.js');

app.use(bodyParser.urlencoded({ extended: true }))

//notify when redis is ready for commands
client.on('ready', function(){
  console.log('Redis is ready')
})

//notify if there is an error with redis
client.on('error', function(err){
  console.log('Error: ' + err)
})

//notify when client is connected to redis
client.on('connect', function(){
  console.log('connected')
})

//main page
app.get('/', function(req, res){
  res.send('Server is ready to accept a command')
})

//log the method used
app.all('/:id', function(req, res, next){
  console.log(req.method)
  next()
})

//use controller file when handling an http request
app.use('/:id', controller)

//open up the server at port 3000 and log that the server is running properly
var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})
