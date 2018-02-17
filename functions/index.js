const functions = require('firebase-functions');
const https = require('https');

const key = functions.config().config &&
  functions.config().config.key ||
  process.env.WEER_FIREBASE_SERVER_KEY;

exports.update = functions.https.onRequest((request, response) => {
  response.status(200).type('application/json').send(request.body).end();

  const POST = https.request({
    host: 'fcm.googleapis.com',
    method: 'POST',
    path: '/fcm/send',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${key}`
    }
  });

  POST.write('{"priority": "high","to": "/topics/weather","notification": {"body": "This is a Firebase Cloud Messaging Topic Message!","title": "FCM Message"}}');
  POST.end();
});

exports.subscribe = functions.https.onRequest((request, response) => {
  const {token} = JSON.parse(request.body);
  response.status(200).type('application/json').send(request.body).end();

  const POST = https.request({
    host: 'iid.googleapis.com',
    method: 'POST',
    path: `/iid/v1/${token}/rel/topics/weather`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': 0,
      'Authorization': `key=${key}`
    }
  });

  POST.end();
});
