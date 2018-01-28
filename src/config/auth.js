export const STATUS = typeof window.env != 'undefined' ? window.env : 'local' // eslint-disable-line

export const BASE_URL = {
  'local': 'http://localhost:8000/',
  'dev': 'https://api-dev.myapp.com/',
  'production': 'https://api.myapp.com/'
}

export const API_URL = BASE_URL[STATUS] + 'api/'
export const BASE_TOKEN = BASE_URL[STATUS]

function getSecret (value = '') {
  return 'API_' + value.toUpperCase()
}

let secrets = {
  API_LOCAL: '8h7igsTOIk08ngWTiWE3J4WiCDjyZI2vZbV2VMOl',
  API_DEV: 'mysecretindev',
  API_PRODUCTION: 'mysecretinproduction'
}

let secret = getSecret(STATUS)
const CLIENT_SECRET = secrets[ secret ]

// src/config/auth.js
export default {
  oauth: {
    grant_type: 'password',
    client_id: 2,
    client_secret: CLIENT_SECRET,
    scope: '*'
  },
  default_storage: 'Cookies', // Supported Types 'Cookies', 'Localstorage',
  oauth_type: 'Bearer'
}
