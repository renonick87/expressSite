let read = function(req, res){
  console.log('successful call to get id')
  client.get(req.params.id, function(error, result){
    if (error) throw error
    else console.log(result)
  })
}

module.exports = read
