// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Button,
  Select,
  Cascader,
  Menu,
  MenuItem,
  Submenu,
  Row,
  Col,
  Backtop,
  Icon
} from 'element-ui'
import App from './App'
import router from './router'
import TreeMenu from './components/TreeMenu'
import TreeSubMenu from './components/TreeSubMenu'
import store from './store'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Backtop)
Vue.use(Icon)

Vue.component(TreeMenu.name, TreeMenu)
Vue.component(TreeSubMenu.name, TreeSubMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
