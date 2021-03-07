var express = require('express');
const personneCtrl = require('../controllers/personneCtrl')

// Router
exports.router = (function(){

  var apiRouter = express.Router()

  /*
      Admins routes
  */
  // Creation d'une admin
  apiRouter.route('/connect/:nom?/:password?').get(personneCtrl.create)
  apiRouter.route('/:link?').get(personneCtrl.link)
  apiRouter.route('/:link/:nom?/:password?').get(personneCtrl.parrain)

  return apiRouter

})()
