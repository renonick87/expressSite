var express = require('express'),
  app = express(),
  redis = require('redis'),
  client = redis.createClient(),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser');

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
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/create/id', function(req, res){
  console.log('successful call to post id')
  let json = {}
  json[req.body.id] = req.body.value
  console.log(json)
  client.set(req.body.id, req.body.value)
})

app.get('/read/:id', function(req, res){
  console.log('successful call to get id')
  let json = {},
  value = client.get(req.params.id, function(error, result){
    if (error) console.error('Error: ' + error)
    else console.log(result)
  })
})

app.put('/update/id', function(req, res){
  console.log('successful call to put id')
  let json = {}
  let succ = client.get(req.body.id, function(error, result){
    if (error) throw error
    else {
      if (result == null) console.log('That id does not exist and should be created rather than updated')
      else{
        client.set(req.body.id, req.body.value, function(error, result){
          if (error) throw error
        })
        json[req.body.id] = req.body.value
        console.log(json)
      }
    }
  })
})

app.delete('/delete/id', function(req, res){
  console.log('successful call to delete id')
  client.del(req.body.id, function(error, result){
    if (error) console.log({ "success": false})
    else console.log({ "success": true})
  })
})

//open up the server at port 3000 and log that the server is running properly
var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})
