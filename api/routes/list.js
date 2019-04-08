const express = require('express');
const app = express();
const listRoutes = express.Router();

// Require Business model in our routes module
let List = require('../models/List');
// Defined store route
listRoutes.route('/add').post(function (req, res) {
  let list = new List(req.body);
  list.save()
    .then(list => {
      res.status(200).json({'list': 'list in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database : "+err);
    });
});

// Defined get data(index or listing) route
listRoutes.route('/').get(function (req, res) {
  List.find(function (err, lists){
    if(err){
      console.log(err);
    }
    else {
      res.json(lists);
    }
  });
});

// Defined edit route
listRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  List.findById(id, function (err, list){
    res.json(list);
  });
});

//  Defined update route
listRoutes.route('/update/:id').post(function (req, res) {
  List.findById(req.params.id, function(err, list, next) {
    if (!list)
      console.log("not load doc")//return next(new Error('Could not load Document'));
    else {
      list.listTitle = req.body.listTitle;
      list.listDescription = req.body.listDescription;

      list.save().then(list => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
listRoutes.route('/delete/:id').get(function (req, res) {
  List.findByIdAndRemove({_id: req.params.id}, function(err, list){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = listRoutes;
