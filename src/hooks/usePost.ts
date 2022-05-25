import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { useCallback } from 'react'

export function usePost<TResponse, TPayload>(url: string) {
  return useCallback(
    async (data: TPayload) => {
      try {
        const cookies = parseCookies()
        let customData = data
        if (cookies.token) {
          customData = { ...data, context: { token: cookies.token } }
        }
        const res = await axios.post<TResponse>(url, customData)

        return res.data
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        throw error
      }
    },
    [url]
  )
}

export function saveToken(token: string) {
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export function deleteToken() {
  setCookie(null, 'token', '', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}
