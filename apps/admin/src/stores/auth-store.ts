import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN_KEY = 'cartop_access_token'
const REFRESH_TOKEN_KEY = 'cartop_refresh_token'

interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    refreshToken: string
    setRefreshToken: (refreshToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const accessTokenCookie = getCookie(ACCESS_TOKEN_KEY)
  const refreshTokenCookie = getCookie(REFRESH_TOKEN_KEY)
  const initAccessToken = accessTokenCookie ? JSON.parse(accessTokenCookie) : ''
  const initRefreshToken = refreshTokenCookie ? JSON.parse(refreshTokenCookie) : ''

  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initAccessToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN_KEY, JSON.stringify(accessToken), {
            maxAge: 15 * 60, // 15 minutes
          })
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      refreshToken: initRefreshToken,
      setRefreshToken: (refreshToken) =>
        set((state) => {
          setCookie(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken), {
            maxAge: 7 * 24 * 60 * 60, // 7 days
          })
          return { ...state, auth: { ...state.auth, refreshToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN_KEY)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN_KEY)
          removeCookie(REFRESH_TOKEN_KEY)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '', refreshToken: '' },
          }
        }),
    },
  }
})
