import Vue from 'vue'
import App from './App.vue'

import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
// Theme Configurations
import '../themeConfig.js'
// ACL
import acl from './acl/acl'
// Globally Registered Components
import './globalComponents.js'
// Styles: SCSS
import './assets/scss/main.scss'
// Tailwind
import '@/assets/css/main.css'
// Vue Router
import router from './router'
// Vuex Store
import store from './store/store'
// Vuexy Admin Filters
import './filters/filters'
// Clipboard
import VueClipboard from 'vue-clipboard2'
// Tour
import VueTour from 'vue-tour'
// VeeValidate
import VeeValidate, {Validator} from 'vee-validate'
import es from 'vee-validate/dist/locale/es';

import {VueHammer} from 'vue2-hammer'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

Vue.use(Vuesax)


Vue.use(VueClipboard)


Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


Vue.use(VeeValidate);
Validator.localize('es', es);


Vue.use(VueHammer)


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  acl,
  render: h => h(App)
}).$mount('#app')
