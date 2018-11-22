import Vue from "nativescript-vue";

import { localize } from "nativescript-localize"
Vue.filter("L", localize)

import routes from '~/router'
Vue.prototype.$routes = routes

import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
TNSFontIcon.paths = {
  ion: './assets/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

import store from '~/store'
import Home from "./components/Home";
import Login from "./components/Login";

Vue.registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab)

const connectivityModule = require("tns-core-modules/connectivity")
connectivityModule.startMonitoring(v => store.commit('setConnectionType',v))

Vue.config.silent = (TNS_ENV === 'production')
import './app.scss'

new Vue({
	store,
	render: h => h('frame', [h(Login)]),
	//render: h => h('frame', store.getters.app_unlocked ? [h(Home)] : [h(Login)]),
	created () {
		console.log("app created")
		console.log(store.getters.app_timestamp)
		console.log(store.getters.hash_master_password)
	}
}).$start();
