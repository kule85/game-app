import PropTypes from 'prop-types'

import { request } from '../utils'

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get'

interface paramsInterface {
  url: string
  method: Methods
  body: object | null
  callback: any
}

export const useRequest = (params: paramsInterface) => {
  const { url, method, body, callback } = params

  const doRequest = async (additionalParams: object) => {
    if (callback) {
      callback({ data: [], loading: true, error: null })
    }

    try {
      if (method) {
        const response = await request[method](url, {
          ...body,
          ...additionalParams,
        })

        if (callback) {
          callback({ data: response.data, loading: false, error: null })
        }
      }
    } catch (err: any) {
      if (callback) {
        callback({ data: [], loading: false, error: err.response })
      }
    }
  }

  return { doRequest }
}

useRequest.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  body: PropTypes.object,
  callback: PropTypes.func,
}

useRequest.defaultProps = {
  method: 'get',
  body: {},
}
