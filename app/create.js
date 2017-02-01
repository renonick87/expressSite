let create = function(req, res){
  console.log('successful call to post id')
  let json = {}
  json[req.body.id] = req.body.value
  console.log(json)
  client.set(req.body.id, req.body.value)
}

module.exports = create
