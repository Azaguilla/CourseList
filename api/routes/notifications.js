const express = require('express');
const app = express();
const notificationRoutes = express.Router();
const cors      = require('cors');
console.log("on passe par notifications.js");

var corsOptions = {
  "origin": "*",
  "Cache-Control": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false
};

// Require Business model in our routes module
let Subscriber = require('../models/Subscriber');

notificationRoutes.route('/').options(cors());
// Defined store route
notificationRoutes.route('/').post(cors(corsOptions),function (req, res) {
  console.log('on est dans la fonction notifications');
  // console.log(res);
  // console.log(req);
  let subscriber = new Subscriber(req.body);
  subscriber.save()
    .then(subscriber => {
      res.status(200).json({'list': 'list in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database : "+err);
    });
});
module.exports = notificationRoutes;
