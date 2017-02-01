var del =  function(req, res){
  console.log('successful call to delete id')
  client.del(req.body.id, function(error, result){
    if (error) console.log({ "success": false})
    else console.log({ "success": true})
  })
}

module.exports = del
