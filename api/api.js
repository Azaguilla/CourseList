const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./bin/db');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected');

    // Routes required
    const listRoute = require('./routes/list');
    const newsletterRouter = require('./routes/newsletter');
    const notificationsRouter = require('./routes/notifications');


    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    console.log('on passe par api.js');
    app.use('/api/notifications', notificationsRouter);
    app.use('/api/newsletter', newsletterRouter);
    app.use('/list', listRoute);

    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
      console.log('Listening on port ' + port);
    });

  },
  err => { console.log('Can not connect to the database'+ err)}
);


