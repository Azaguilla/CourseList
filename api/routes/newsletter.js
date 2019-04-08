const webpush = require('web-push');
const http    = require('http');
const express = require('express');
const uri     = 'http://localhost:4000';
const newsletterRoutes = express.Router();
const cors    = require('cors');

var corsOptions = {
  "origin": "*",
  "Cache-Control": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false
};

console.log('on passe ensuite par newsletter.js');
const vapidKeys = {
  "publicKey":"BEdsuyw6Yyo3iUtrcSlTvzIMS9bL1ymRPOR6oi0V0Xt01eUx9Ty_Aw5Hi_6KjlwwQvKnQAVc6_fDtdWfFYt6sBY",
  "privateKey":"TdicwEELz9_fScAdQ3Z8mb8HX7uYh-LY1NAW8EMNZy0"
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();

newsletterRoutes.route('/').options(cors());
newsletterRoutes.route('/').post(cors(corsOptions), async function (req, res) {
    console.log('on est dans la fonction sendNewsletter')
    let Subscription = require('../models/Subscriber');
    const allSubscriptions = await Subscription.find();
   // console.log(allSubscriptions);

    console.log('Total subscriptions :', allSubscriptions.length);

    const notificationPayload = {
      "notification": {
        "title": "Une liste vient d'être ajoutée !",
        "body": "Une nouvelle liste a été créée par un utilisateur",
        "icon": "assets/main-page-logo-small-hat.png",
        "vibrate": [100, 50, 100],
        "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
        },
        "actions": [{
          "action": "explore",
          "title": "Go to the site"
        }]
      }
    };

    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload) )))
      .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
      .catch(err => {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
      });
  }
);

module.exports = newsletterRoutes;
