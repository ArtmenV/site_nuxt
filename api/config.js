import Cookie from 'js-cookie'

const token = _ => {
  return Cookie.get('dpc_token')
}

const prod = false

// // ADD PROD URL HERE
// develop url
// const url = 'https://demo-dpchallengeapi.zimalab.com'
const url = process.env.baseUrl
// console.log('url', url)
//staging url
// const url = 'https://stagingapi.dpchallenge.zimalab.com'

const apiPrefix = '/api/v1'

const requestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const buildRequestConfigOptionalAuth = _ => {
  const _token = token()

  const config = {
    headers: {
      ...requestConfig.headers
    }
  }

  if (_token && _token !== 'undefined') {
    config.headers['Authorization'] = "bearer " + _token
  }

  return config
}

const buildRequestConfigAuth = _ => {
  return {
    headers: {
      ...requestConfig.headers,
  
      'Authorization': "bearer " + token()
    }
  }
}

const buildRequestConfigAuthOnly = _ => {
  return {
    headers: {
      'Authorization': "bearer " + token(),
    }
  }
}

export {
  prod,
  url,
  requestConfig,
  buildRequestConfigAuth,
  buildRequestConfigAuthOnly,
  buildRequestConfigOptionalAuth,
  apiPrefix
}
