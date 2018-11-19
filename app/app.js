import Vue from "nativescript-vue";

import { localize } from "nativescript-localize"
Vue.filter("L", localize)

import routes from '~/router'
Vue.prototype.$routes = routes

import store from '~/store'
import Home from "./components/Home";

Vue.registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab)

const connectivityModule = require("tns-core-modules/connectivity")
connectivityModule.startMonitoring(v => store.commit('setConnectionType',v))

Vue.config.silent = (TNS_ENV === 'production')

new Vue({
	store,
	template: `
		<Frame>
			<Home />
		</Frame>`,
	components: {
		Home
	}
}).$start();
