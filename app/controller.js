var express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  redis = require('redis'),
  host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
  client = redis.createClient(6379, host);

//notify when redis is ready for commands
client.on('ready', function(){
  console.log('Redis is ready')
})

//notify if there is an error with redis, but doesn't crash server
client.on('error', function(err){
  console.log('Error: ' + err)
})

//notify when client is connected to redis
client.on('connect', function(){
  console.log('connected')
})

//handles the create/post request
router.post('/', function(req, res){
  let json = {}
  json.id = req.body.id
  json.value = req.body.value
  console.log(json)
  client.set(req.body.id, req.body.value)
  res.send(json)
})

//handles the read/get request
router.get('/', function(req, res){
  client.get(req.query.id, function(error, result){
    if (error) throw error
    else{
      console.log({"value": result})
      res.send({"value": result})
    }
  })
})

//handles the update/put request
router.put('/', function(req, res){
  let json ={}
  //checks if the id exists
  client.get(req.body.id, function(error, result){
    if (error) throw error
    else {
      //if the id does not exist, log message to create
      if (result == null) {
        console.log('That id does not exist and should be created before being updated')
        res.send('That id does not exist and should be created before being updated')
      } else {
        client.set(req.body.id, req.body.value, function(error, result){
          if (error) throw error
        })
        json.id = req.body.id
        json.value = req.body.value
        console.log(json)
        res.send(json)
      }
    }
  })
})

//handles the delete request
router.delete('/', function(req, res){
  client.del(req.body.id, function(error, result){
    let json = {}
    //if there was an error deleting, send false
    json.success = !error
    console.log(json)
    res.send(json)
  })
})

module.exports = router
