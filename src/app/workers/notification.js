import {notification} from 'config';
import {firebase} from '../libs/firebase.auth.js';

const serviceWorker = window.navigator && window.navigator.serviceWorker;
const registerPromise = serviceWorker && serviceWorker.register('static/notification.worker.js');

registerPromise.then(registration => {
  const messaging = firebase.messaging();
  messaging.useServiceWorker(registration);
  messaging.requestPermission().then(() => {
    messaging.onMessage(payload => {
      console.log('[firebase-messaging-sw.js] Received foreground message ', payload);  // eslint-disable-line no-console
    });
  });
  return messaging.getToken();
})
.then(token => {
  fetch('https://us-central1-amsterdam-neerslag.cloudfunctions.net/subscribe', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      token
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
});

if (Notification) {
  Notification.requestPermission();
} else {
  console.error('Desktop notifications not available in your browser.'); // eslint-disable-line no-console
}

export const notifyMe = () => {
  if (Notification && Notification.permission === 'granted') {
    const {options, title} = notification;
    if (registerPromise) {
      registerPromise.then(registration => {
        registration.showNotification(title, options);
        serviceWorkerRequest(registration, 'h1');
      });
    } else {
      const browserNotification = new Notification(title, options);
      browserNotification.addEventListener('click', () => {
        console.log('this is actually clicked'); // eslint-disable-line no-console
      });
    }
  }
};

function serviceWorkerRequest(wrkr, message) {
  if ('serviceWorker' in navigator) {
    if (!wrkr) {
      return Promise.reject('No service worker controller.');
    }
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = event => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      wrkr.active.postMessage(message, [messageChannel.port2]);
    });
  }
}
