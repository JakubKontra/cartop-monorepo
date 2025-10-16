import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN_KEY = 'cartop_access_token'
const REFRESH_TOKEN_KEY = 'cartop_refresh_token'
const USER_KEY = 'cartop_user'
const ORIGINAL_USER_KEY = 'cartop_original_user'
const IS_IMPERSONATING_KEY = 'cartop_is_impersonating'

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
    originalUser: AuthUser | null
    setOriginalUser: (user: AuthUser | null) => void
    isImpersonating: boolean
    setIsImpersonating: (isImpersonating: boolean) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    refreshToken: string
    setRefreshToken: (refreshToken: string) => void
    resetAccessToken: () => void
    stopImpersonation: () => void
    reset: () => void
  }
}

/**
 * Helper to sync Zustand state with cookies
 * Returns current token from cookie or empty string if expired
 */
const getTokenFromCookie = (key: string): string => {
  const cookie = getCookie(key)
  return cookie ? JSON.parse(cookie) : ''
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const accessTokenCookie = getCookie(ACCESS_TOKEN_KEY)
  const refreshTokenCookie = getCookie(REFRESH_TOKEN_KEY)
  const userCookie = getCookie(USER_KEY)
  const originalUserCookie = getCookie(ORIGINAL_USER_KEY)
  const isImpersonatingCookie = getCookie(IS_IMPERSONATING_KEY)
  const initAccessToken = accessTokenCookie ? JSON.parse(accessTokenCookie) : ''
  const initRefreshToken = refreshTokenCookie ? JSON.parse(refreshTokenCookie) : ''
  const initUser = userCookie ? JSON.parse(userCookie) : null
  const initOriginalUser = originalUserCookie ? JSON.parse(originalUserCookie) : null
  const initIsImpersonating = isImpersonatingCookie ? JSON.parse(isImpersonatingCookie) : false

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => {
          if (user) {
            setCookie(USER_KEY, JSON.stringify(user), {
              maxAge: 7 * 24 * 60 * 60, // 7 days
            })
          } else {
            removeCookie(USER_KEY)
          }
          return { ...state, auth: { ...state.auth, user } }
        }),
      originalUser: initOriginalUser,
      setOriginalUser: (originalUser) =>
        set((state) => {
          if (originalUser) {
            setCookie(ORIGINAL_USER_KEY, JSON.stringify(originalUser), {
              maxAge: 7 * 24 * 60 * 60, // 7 days
            })
          } else {
            removeCookie(ORIGINAL_USER_KEY)
          }
          return { ...state, auth: { ...state.auth, originalUser } }
        }),
      isImpersonating: initIsImpersonating,
      setIsImpersonating: (isImpersonating) =>
        set((state) => {
          setCookie(IS_IMPERSONATING_KEY, JSON.stringify(isImpersonating), {
            maxAge: 7 * 24 * 60 * 60, // 7 days
          })
          return { ...state, auth: { ...state.auth, isImpersonating } }
        }),
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
      stopImpersonation: () =>
        set((state) => {
          removeCookie(IS_IMPERSONATING_KEY)
          removeCookie(ORIGINAL_USER_KEY)
          return {
            ...state,
            auth: {
              ...state.auth,
              isImpersonating: false,
              originalUser: null,
            },
          }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN_KEY)
          removeCookie(REFRESH_TOKEN_KEY)
          removeCookie(USER_KEY)
          removeCookie(ORIGINAL_USER_KEY)
          removeCookie(IS_IMPERSONATING_KEY)
          return {
            ...state,
            auth: {
              ...state.auth,
              user: null,
              originalUser: null,
              isImpersonating: false,
              accessToken: '',
              refreshToken: '',
            },
          }
        }),
    },
  }
})
