export const colors = {
  primary: '#000',
  success: '#28C76F',
  danger: '#EA5455',
  warning: '#FF9F43',
  dark: '#1E1E1E',
}

// CONFIGS
const appConfig = {
  disableCustomizer: true,
  disableThemeTour: true,
  footerType: 'hidden',
  hideScrollToTop: false,
  mainLayoutType: 'horizontal',
  navbarColor: '#fff',
  navbarType: 'static',
  routerTransition: 'zoom-fade',
  rtl: false,
  sidebarCollapsed: false,
  theme: 'light',

  userInfoLocalStorageKey: 'userInfo'
}

import Vue from 'vue'
import Vuesax from 'vuesax'

Vue.use(Vuesax, {theme: {colors}, rtl: appConfig.rtl})

export default appConfig
