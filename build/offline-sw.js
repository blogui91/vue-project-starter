importScripts('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js') // eslint-disable-line
importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js') // eslint-disable-line
importScripts('https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js') // eslint-disable-line
importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.1/dexie.min.js') // eslint-disable-line
importScripts('./AppServiceWorker/index.js')

self.addEventListener('installing', function (event) {
  // this happens while the old version is still in control
  console.log("Installing")
  // event.waitUntil(
  //   fetchStuffAndInitDatabases()
  // );
});

self.addEventListener('onupdatefound', function (event) {
  // this happens while the old version is still in control
  console.log("An update was found", moment().format('YYYY-MM-DD HH:mm:ss'))
  // event.waitUntil(
  //   fetchStuffAndInitDatabases()
  // );
});

self.addEventListener('activate', function (event) {
  // the old version is gone now, do what you couldn't
  // do while it was still around
  console.log("Activate")
  // event.waitUntil(
  //   schemaMigrationAndCleanup()
  // )
});


self.addEventListener('message', function (event) {
  if (event.ports.length > 0) {
    event.data.app = event.data.payload.app
    event.ports[0].postMessage(event.data)
  }
})


self.addEventListener('fetch', function (e) {})


self.addEventListener('push', _.debounce(function (e) {}, 1000))

/*

function verify() {
  //axios.get('http://localhost:8000/api/currentuser').then(s => console.log(s)).catch(error => console.log(error))
  fetch('http://localhost:8000/api/currentuser', {
    method: 'get',
    mode: 'cors',
    headers: {
      "Content-type": "application/json",
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzMTUxYzExY2FiZmU1OGQ5NjU2YmFjNmNjYWMyNThlZjZmZmJkYTgxZTQxNzQ4M2NkNzAzNjNjZjBkMmRjMzFkZjRjNmI5NjcxOTRiNjc4In0.eyJhdWQiOiIyIiwianRpIjoiNTMxNTFjMTFjYWJmZTU4ZDk2NTZiYWM2Y2NhYzI1OGVmNmZmYmRhODFlNDE3NDgzY2Q3MDM2M2NmMGQyZGMzMWRmNGM2Yjk2NzE5NGI2NzgiLCJpYXQiOjE1MTczMDExODAsIm5iZiI6MTUxNzMwMTE4MCwiZXhwIjoxNTE4NTk3MTgwLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.qcvyXp15eosxTZhextOOX5b3N2Df3agOtN7VC54NHYmH2BO559gdH8RIYwaPlgkGSuxwGyjaP0ugOMg_WYTL1F0eqFAbugn2xMA4zc123nJpaVRu18711mPMwRSUhIsHFIEPiN74cYoY9UngPifIdxo-FdJj06V8Ec2TofI_OO-zFRdPkfq8P6STf2N8e1CH9a3HpABSDxXEdHUF-_I77HGLLG385dqs_C9KoLmWfevfkC7RNdrE1yLsbawDl2pJuLHaRge77wOqaQGnXd2wJPZMpqju_tQNgPhJOztc4vVoAsMkj6qNEyQ0Udkv_eJE1Jo723k8cPq_dpNP07r5Tnr4kj7RuDLybDRQcyjHbVvkdeMQXgDj9K73_HsFZfDv2U7gWDOhDJ75l-sMIQpd3HDxTSR6Voa9AHQ-35c0lEBsnRk11vw-GLK9rfki1WfJw_YzkjLTWoE1YR9-yJ29YqLL1U5QFlyReEZPVP9xQYLgfMD141N6fXZOUex3a03Nswvl6gHJw7qZ8RXsHAtMJ3IFW-PA1RLmNKWoMe7eprm9pwygisIqUsIyIVXG9t7_OgZzchyQiNB6dbMXkoEd7b6sk5KkCHffwZzXjv5bziMj_93bXEMDAyi0_OHoOYyfPVfRD04ZKL0FelbGlOEVM9w0qn1WLm9rpa7Ne9m_shk'
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
      }
      else{
        return Promise.reject(new Error(response.statusText))
      }
    }).then(data => {
      console.log("res ",data)
    }).catch(err => {
      throw err
    });
    self.setTimeout(function () {
      verify();
    },20600)
  }


  */

function sendMessageToClients(command, payload ) {
  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      client.postMessage({
        command,
        payload
      });
    })
  })
}
