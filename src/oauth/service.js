import Http from 'axios'
import API from 'src/api' // It will changed to config OAuth
export default {
  user: null,
  destroySession () {
    this.user = null
  },
  async currentUser () {
    if (this.user) {
      return this.user
    }
    try {
      let user = await Http.get(API.CURRENT_USER_URL)
      this.user = user
      return user
    }
    catch (error) {
      return error
    }
  },
  async attemptLogin (credentials) {
    try {
      let response = await Http.post(API.TOKEN_URL, credentials)
      return new Promise(resolve => resolve(response))
    }
    catch (error) {
      return new Promise((resolve, reject) => reject(error))
    }
  },
  addAuthorizationHeader (header) {
    Http.defaults.headers.common['Authorization'] = header
  }
}
