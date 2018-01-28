import Service from 'easy-requests'
import { API_URL } from 'config/env'
import API from 'src/api' // It will changed to config OAuth
import { EventDispatcher } from 'src/event'

class User extends Service {
  constructor () {
    super()
    this.config.origin = API_URL
    this.config.endpoint = '/users/'
  }

  static async currentUser () {
    let UserI = new User()

    try {
      let response = await UserI.http.get(API.CURRENT_USER_URL)
      EventDispatcher.fire('user:fetched', response.data)
      return response
    }
    catch (error) {
      throw error
    }
  }
}

export default User
