import { appends, appendsForAdd } from './index'
const getSWPath = (swName) => window.location.origin + '/' + swName + '-sw.js' // eslint-disable-line

(async function initListeners () { // eslint-disable-line
  if ('serviceWorker' in navigator) {
    // Handler for messages coming from the service worker
    let serviceWorkers = await navigator.serviceWorker.getRegistrations()

    serviceWorkers.forEach(serviceWorker => {
      serviceWorker.addEventListener('message', function (event) {
        console.log('Client 1 Received Message: ' + event)
        // event.ports[0].postMessage("Client 1 Says 'Hello back!'");
      })
    })
  }
})()

export async function add (mod = null, command, payload) {
  try {
    let serviceWorker = await getSW()
    if (payload.constructor === Object) {
      Object.assign(payload, { ...appendsForAdd })
      payload.api += mod
      payload.method = 'POST'
    }
    return sendToSW(serviceWorker, mod, command, payload)
  }
  catch (error) {
    console.log(error)
  }
}

function sendToSW (serviceWorker, command, payload) {
  return new Promise((resolve, reject) => {
    var messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error)
      }
      else {
        resolve(event.data)
      }
    }
    serviceWorker.active.postMessage({
      command,
      payload
    }, [messageChannel.port2])
  })
}

async function getSW (name = 'offline') {
  const origin = getSWPath(name)
  try {
    let serviceWorkers = await navigator.serviceWorker.getRegistrations()
    const availableSWs = serviceWorkers.filter(sw => sw.active && sw.active.scriptURL === origin)
    if (availableSWs.length > 0) {
      return new Promise((resolve, reject) => resolve(availableSWs[0]))
    }
    const valid = {
      valid: false
    }
    return new Promise((resolve, reject) => reject(valid))
  }
  catch (error) {
    console.log(error)
  }
}

export async function send (module = null, command, payload = {}) {
  const origin = getSWPath('offline')
  try {
    let serviceWorkers = await navigator.serviceWorker.getRegistrations()
    if (payload.constructor === Object) {
      Object.assign(payload, { ...appends })
    }
    const availableSWs = serviceWorkers.filter(sw => sw.active && sw.active.scriptURL === origin)
    if (availableSWs.length > 0) {
      let serviceWorker = availableSWs[0]
      return sendToSW(serviceWorker, command, payload)
    }
  }
  catch (error) {
    console.log(error)
  }
}
