import OAuth from 'src/oauth'
import { uid } from 'quasar'
import { API_URL } from 'src/config/env'
import moment from 'moment'
const Auth = new OAuth()

export const appends = {
  // Append data when you dispatch event to SW
  app: 'my-app'
}

export function appendsForAdd () {
  Auth.addAuthHeaders()
  const append = {
    request_headers: window.axios.defaults.headers,
    api: API_URL,
    status: 'pending',
    retries: 0,
    uuid: uid(),
    response_code: null,
    response_body: null,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  return append
}
