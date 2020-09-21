import Vue from 'vue'
import clickOutside from '../directives/click-ouside.js'

import { Loading, MessageBox, Message } from 'element-ui'

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

Vue.directive('click-outside', clickOutside)
Vue.use(Loading.directive)

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
