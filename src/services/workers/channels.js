import PackageJson from '../../../package.json' // eslint-disable-line
import { appends } from './index'
const getSWPath = (swName) => window.location.origin + '/' + swName + '-sw.js'

export async function send (command, payload = {}, swName = 'offline') {
  const origin = getSWPath(swName)
  try {
    let serviceWorkers = await navigator.serviceWorker.getRegistrations()
    if (payload.constructor === Object) {
      Object.assign(payload, { ...appends })
    }
    const availableSWs = serviceWorkers.filter(sw => sw.active && sw.active.scriptURL === origin)
    if (availableSWs.length > 0) {
      let serviceWorker = availableSWs[0]
      return sendToSW(serviceWorker, command, payload, PackageJson.name)
    }
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
