// localStorage
const TOKEN = 'token'

export default {
  // token
  setToken: (token) => {
    window.localStorage.setItem(TOKEN, token)
  },
  getToken: () => {
    return window.localStorage.getItem(TOKEN)
  },
  rmToken: () => {
    window.localStorage.removeItem(TOKEN)
  },

  clear: () => {
    window.sessionStorage.clear()
    window.localStorage.clear()
  },
}
