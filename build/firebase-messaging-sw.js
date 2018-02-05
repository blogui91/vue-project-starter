console.log("Running Firebase Worker")

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "969569081226",
  apiKey: "AIzaSyCYxnlZE09auNxxQrXM2QUur-T0orB0evA",
  authDomain: "carzuz-170320.firebaseapp.com",
  databaseURL: "https://carzuz-170320.firebaseio.com",
  projectId: "carzuz-170320",
  storageBucket: "carzuz-170320.appspot.com",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
var fb_messaging = firebase.messaging();

// Shows a notification
function showNotification(event) {
  var payload = event.data
  // The notification title
  var notificationTitle = payload.title
  var notificationBody = payload.body

  var click_url = self.location.origin + "/#/vehicles/" + payload.vehicle_id

  if (payload.forwarded == 1 && payload.seller_id == payload.receiver_id) {
    click_url = self.location.origin + "/#/forward/vehicle/" + payload.vehicle_id
  }

  payload.click_action = click_url
  // The notification properties
  var notificationOptions = {
    body: notificationBody,
    //icon: './statics/icons/icon-192x192.png',
    badge: './statics/icons/icon-72x72.png',
    //image: './pwa/carzuz_logo.png',
    data: {
      click_url: click_url
    },
    tag: Date.now()
  };

  if (payload.vehicle_photo) {
    notificationOptions.image = payload.vehicle_photo
  }

  if (payload.logo) {
    notificationOptions.icon = payload.logo
  }

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
}

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
fb_messaging.setBackgroundMessageHandler(debounce(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  return showNotification(payload);
}, 3000));

// Forces a notification
self.addEventListener('message', debounce(function (evt) {
  evt.waitUntil(showNotification(evt));
}, 3000));

self.addEventListener('push', function (event) {
  // Customize notification here
  //event.waitUntil(showNotification(event));
});

// The user has clicked on the notification ...
self.addEventListener('notificationclick', function (event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  if (event.notification.data && event.notification.data.click_url) {
    // gets the notitication click url
    var click_url = event.notification.data.click_url;

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      includeUncontrolled: true,
      type: "window"
    }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == click_url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        var url = click_url;
        return clients.openWindow(url);
      }
    }));
  }
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
