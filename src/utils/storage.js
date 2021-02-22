// sessionStorage
const TOKEN = 'token'
const USERINFO = 'userinfo'
const PAGE = 'page'
const WEBAPPCONFIG = 'webappconfig'
const ORGID = 'org_id'
const HREF = 'location_href'
const TOLOGINFLAG = 'tologin_flag'

// localStorage
const MENUCOLLAPSE = 'menuCollapse'
const AGENT = 'agent-seq'
const PERMISSION = 'PERMISSION'

export default {
  // org_id
  setOrgId: (id) => {
    window.localStorage.setItem(ORGID, id)
  },
  getOrgId: () => {
    return Number(window.localStorage.getItem(ORGID))
  },
  rmOrgId: () => {
    window.localStorage.removeItem(ORGID)
  },

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

  setToLoginFlag: () => {
    window.localStorage.setItem(TOLOGINFLAG, true)
  },
  getToLoginFlag: () => {
    return window.localStorage.getItem(TOLOGINFLAG)
  },
  rmToLoginFlag: () => {
    return window.localStorage.removeItem(TOLOGINFLAG)
  },

  // location href
  setLocationHref: (href) => {
    return window.localStorage.setItem(HREF, href)
  },
  getLocationHref: () => {
    return window.localStorage.getItem(HREF)
  },
  rmLocationHref: () => {
    window.localStorage.removeItem(HREF)
  },

  // agent
  getAgent: () => {
    let agent = window.localStorage.getItem(AGENT)
    if (agent) {
      return agent
    }
    agent = Math.random().toString(36).substr(2)
    window.localStorage.setItem(AGENT, agent)
    return agent
  },
  rmAgent: () => {
    window.localStorage.removeItem(AGENT)
  },

  // permission
  setPermission: (permission) => {
    window.localStorage.setItem(PERMISSION, JSON.stringify(permission))
  },
  getPermission: () => {
    const p = window.localStorage.getItem(PERMISSION)
    return p ? JSON.parse(p) : []
  },
  rmPermission: () => {
    window.localStorage.removeItem(PERMISSION)
  },

  // userinfo
  setUserInfo: (info) => {
    window.localStorage.setItem(USERINFO, JSON.stringify(info))
  },
  getUserInfo: () => {
    const i = window.localStorage.getItem(USERINFO)
    return i ? JSON.parse(i) : null
  },
  rmUserInfo: () => {
    window.localStorage.removeItem(USERINFO)
  },

  // page
  setPageOption: (page) => {
    window.sessionStorage.setItem(PAGE, JSON.stringify(page))
  },
  getPageOption: () => {
    const p = window.sessionStorage.getItem(PAGE)
    return p ? JSON.parse(p) : null
  },
  rmPageOption: () => {
    window.sessionStorage.removeItem(PAGE)
  },

  // webappConfig
  setWebappConfig: (config) => {
    window.localStorage.setItem(WEBAPPCONFIG, JSON.stringify(config))
  },
  getWebappConfig: () => {
    const p = window.localStorage.getItem(WEBAPPCONFIG)
    return p ? JSON.parse(p) : null
  },
  rmWebappConfig: () => {
    window.localStorage.removeItem(WEBAPPCONFIG)
  },

  clear: () => {
    window.sessionStorage.clear()
    window.localStorage.clear()
  },

  // 下面是一些用户自定义行为，存到localStorage即可
  // menuCollapse
  setMenuCollapse: (payload) => {
    window.localStorage.setItem(MENUCOLLAPSE, payload)
  },
  getMenuCollapse: () => {
    return window.localStorage.getItem(MENUCOLLAPSE)
  },
  rmMenuCollapse: () => {
    window.localStorage.removeItem(MENUCOLLAPSE)
  },
}
