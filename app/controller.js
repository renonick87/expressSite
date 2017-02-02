var express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  redis = require('redis'),
  client = redis.createClient();

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

router.post('/', function(req, res){
  let json = {}
  json.id = req.body.id
  json.value = req.body.value
  console.log(json)
  client.set(req.body.id, req.body.value)
  res.send(json)
})

router.get('/', function(req, res){
  client.get(req.params.id, function(error, result){
    if (error) throw error
    else{
      console.log({"value": result})
      res.send({"value": result})
    }
  })
})

router.put('/', function(req, res){
  let json ={}
  client.get(req.body.id, function(error, result){
    if (error) throw error
    else {
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

router.delete('/', function(req, res){
  client.del(req.body.id, function(error, result){
    let json = {}
    if (error) {
      json.success = false
      console.log(json)
      res.send(json)
    }
    else {
      json.success = true
      console.log(json)
      res.send(json)
    }
  })
})

module.exports = router
