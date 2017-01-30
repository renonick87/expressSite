var express = require('express'),
  app = express(),
  redis = require('redis'),
  client = redis.createClient(),
  path = require('path')

//monitor for commands being given
client.monitor(function(err, res){
  console.log('Entering monitoring mode.')
})

//monitor when commands are given to redis and log the time
client.on('monitor', function(time, args, raw_reply){
  console.log(time + ': ' + args)
})

//notify when redis is ready for commands
client.on('ready', function(){
  console.log('Redis is ready')
})

//notify when there is an error
client.on('error', function(err){
  console.log('Error: ' + err)
})

//notify when client is connected to redis
client.on('connect', function(){
  console.log('connected')
})

//main page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/:id', function(req, res){
  console.log('successful call to /id')
  res.sendFile(path.join(__dirname + '/id.html'))
})

//open up the server at port 3000 and log that the server is running properly
var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})
