import { store } from 'src/stores'
export class AppServiceProvider {
  constructor () {
    this.checkConnection()
    this.initEvents()
  }

  initEvents () {
    window.addEventListener('online', (e) => this.handleResponse(e))
    window.addEventListener('offline', (e) => this.handleResponse(e))
  }

  checkConnection () {
    this.sendToVuex(navigator.onLine ? 'online' : 'offline')
  }

  handleResponse (browser) {
    this.sendToVuex(browser.type)
    console.info('Browser ', browser.type)
  }

  sendToVuex (payload) {
    store.dispatch('app/setStatus', payload, {
      root: true
    })
  }
}
