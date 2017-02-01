var update = function(req, res){
  console.log('successful call to put id')
  let json ={}
  client.get(req.body.id, function(error, result){
    if (error) throw error
    else {
      if (result == null) console.log('That id does not exist and should be created before being updated')
      else {
        client.set(req.body.id, req.body.value, function(error, result){
          if (error) throw error
        })
        json[req.body.id] = req.body.value
        console.log(json)
      }
    }
  })

}

module.exports = update
