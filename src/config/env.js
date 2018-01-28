export const STATUS = typeof window.env != 'undefined' ? window.env : 'local' // eslint-disable-line

export const BASE_URL = {
  'local': 'http://localhost:8000/',
  // 'local': 'http://10.0.0.7:8000/',
  'demo': 'http://api.cesarsantana.ml/',
  'example': 'https://jsonplaceholder.typicode.com/',
  'beta': 'https://beta.carzuz.com/',
  'test': 'https://carzuz.bycarbono.tech/'
}

function apiSecret (value = '') {
  return `API_${value.toUpperCase()}_SECRET`
}

let secrets = {
  API_LOCAL_SECRET: '8h7igsTOIk08ngWTiWE3J4WiCDjyZI2vZbV2VMOl',
  API_BETA_SECRET: 'ohogsfw7mkb0Mx2sRj0YQq8HH86DiYRBnHcTIASx',
  API_TEST_SECRET: 'ohogsfw7mkb0Mx2sRj0YQq8HH86DiYRBnHcTIASx'
}

export const DEFAULT_LOCALE = 'en'
export const FALLBACK_LOCALE = 'en'
export const API_BASE_URL = BASE_URL[STATUS]
export const API_URL = BASE_URL[STATUS] + 'api/'
export const BASE_TOKEN = BASE_URL[STATUS]

let secret = apiSecret(STATUS)

export default {
  oauth: {
    grant_type: 'password',
    client_id: 2,
    client_secret: secrets[secret],
    scope: '*'
  }
}
