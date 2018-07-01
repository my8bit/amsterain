/* global clients, MessageChannel, importScripts, firebase */

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '312068587037'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload); // eslint-disable-line no-console
});

self.addEventListener('message', event => {
  self.clients.matchAll().then(all => all.forEach(client => {
    client.postMessage(`Responding to ${event.data}`);
  }));
});
/*
self.addEventListener('notificationclick', event => {
  event.waitUntil(clients.matchAll({
    includeUncontrolled: true, type: 'all'
  }).then(clientList => {
    for (let i = 0; i < clientList.length; i++) {
      clientList[i].focus();
    }
  }));

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true, type: 'all'
  }).then(all => all.forEach(client => {
    client.postMessage(`Responding to ${event.data}`);
  })));
});

self.addEventListener('message', event => {
  const sender = (event.ports && event.ports[0]) || event.source;
  sender.postMessage('Here are your queued notifications!');
});
*/
