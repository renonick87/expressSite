var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  controller = require('./app/controller.js');

app.use(bodyParser.urlencoded({ extended: true }))

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
