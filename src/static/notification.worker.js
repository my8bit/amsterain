/* global clients, MessageChannel */

window.self.addEventListener('message', event => {
  window.self.clients.matchAll().then(all => all.forEach(client => {
    client.postMessage(`Responding to ${event.data}`);
  }));
});

window.self.addEventListener('notificationclick', event => {
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

window.self.addEventListener('message', event => {
  const sender = (event.ports && event.ports[0]) || event.source;
  sender.postMessage('Here are your queued notifications!');
});
