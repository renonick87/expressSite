var express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  create = require('./create.js'),
  read = require('./read.js'),
  update = require('./update.js'),
  del = require('./delete.js');

router.post('/', function(req, res){
  create(req, res)
})

router.get('/', function(req, res){
  read(req, res)
})

router.put('/', function(req, res){
  update(req, res)
})

router.delete('/', function(req, res){
  del(req, res)
})

module.exports = router
