import { request } from '../utils'

interface paramsInterface {
  url: string
  method: 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get'
  body?: object
  callback?: any
}

export const useRequest = (params: paramsInterface) => {
  const { url, method, body, callback } = params
  let isFetched = true

  const doRequest = async (additionalParams?: object) => {
    if (callback) {
      callback({ data: [], loading: true, error: null })
    }

    try {
      if (method && isFetched) {
        isFetched = false
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
