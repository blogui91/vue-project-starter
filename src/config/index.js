import Env from 'env'
export let STATUS = Env.SERVER
export const BASE_URL = {
  'local': 'http://localhost:8000/',
  'demo': 'http://api.cesarsantana.ml/',
  'example': 'https://jsonplaceholder.typicode.com/',
  'beta': 'https://beta.carzuz.com/',
  'test': 'https://carzuz.bycarbono.tech/'
}
function apiSecret (value = '') {
  return `API_${value.toUpperCase()}_SECRET`
}
let secrets = {
  API_LOCAL_SECRET: Env.API_LOCAL_SECRET,
  API_BETA_SECRET: Env.API_BETA_SECRET,
  API_TEST_SECRET: Env.API_TEST_SECRET
}

export const DEFAULT_LOCALE = Env.LOCALE
export const FALLBACK_LOCALE = 'en'
export const API_BASE_URL = BASE_URL[STATUS]
export const API_URL = BASE_URL[STATUS] + 'api/'
export const BASE_TOKEN = BASE_URL[STATUS]

let secret = apiSecret(STATUS)

export default {
  oauth: {
    grant_type: 'password',
    client_id: Env.CLIENT_ID,
    client_secret: secrets[secret],
    scope: '*'
  }
}
