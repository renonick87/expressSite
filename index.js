var express = require('express'),
  app = express(),
  redis = require('redis'),
  client = redis.createClient(),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser');

//monitor for commands being given
//client.monitor(function(err, res){
  //console.log('Entering monitoring mode.')
//})

app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/create', function(req, res){
  console.log('successful call to create')
  client.set('key1', 'val1')
  client.get('key1', redis.print)
  res.sendFile(path.join(__dirname + '/app/create.html'))
})

app.get('/read', function(req, res){
  console.log('successful call to read')
  client.get('key1', redis.print)
  console.log(client.get('key1'))
  res.sendFile(path.join(__dirname + '/app/read.html'))
})

app.get('/update', function(req, res){
  console.log('successful call to update')
  client.set('key1', 'val2')
  client.get('key1', redis.print)
  res.sendFile(path.join(__dirname + '/app/update.html'))
})

app.get('/delete', function(req, res){
  console.log('successful call to delete')
  let succ = client.del('key1')
  //confirm that key was deleted
  if(succ == true){
    console.log(true)
  } else {
    console.log('Problem occurred deleting key')
    res.send(false)
  }
  res.sendFile(path.join(__dirname + '/app/delete.html'))
})

app.post('/create/id', function(req, res){
  console.log('successful call to post id')
  //res.sendFile(path.join(__dirname + '/app/id.html'))
  let json = {}
  json[req.body.id] = req.body.value
  console.log(json)
  client.set(req.body.id, req.body.value)
})

app.get('/read/:id', function(req, res){
  console.log('successful call to get id')
  //res.sendFile(path.join(__dirname + '/app/id.html'))
  let json = {},
  value = client.get(req.params.id, function(error, result){
    if (error) console.error('Error: ' + error)
    else console.log(result)
  })
  //console.log(value)
  res.send('wooh')
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
  //res.sendFile(path.join(__dirname + '/app/id.html'))
})

app.delete('/delete/id', function(req, res){
  console.log('successful call to delete id')
  client.del(req.body.id, function(error, result){
    if (error) console.log({ "success": false})
    else console.log({ "success": true})
  })
  //res.sendFile(path.join(__dirname + '/app/id.html'))
})

//open up the server at port 3000 and log that the server is running properly
var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})
