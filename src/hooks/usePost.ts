import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { useCallback } from 'react'

export function usePost<TResponse extends { token?: string }, TPayload>(
  url: string
) {
  return useCallback(
    async (data: TPayload) => {
      try {
        const cookies = parseCookies()
        let customData = data
        if (cookies.token) {
          customData = { ...data, context: { token: cookies.token } }
        }
        const res = await axios.post<TResponse>(url, customData)
        if (res.data.token) {
          setCookie(null, 'token', res.data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })
        }
        return res.data
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        throw error
      }
    },
    [url]
  )
}
