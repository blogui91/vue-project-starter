import Service from 'easy-requests'
import { API_URL } from 'config/env'
import { EventDispatcher } from 'src/event'

class Visit extends Service {
  constructor () {
    super()
    this.config.origin = API_URL
    // this.config.endpoint = '/Visit/'
  }

  fetched (e) {
    EventDispatcher.fire('Visit:fetched', e)
  }
}
export default Visit
