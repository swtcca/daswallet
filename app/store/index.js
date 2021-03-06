import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import appLock from './modules/appLock'
import swtc from './modules/swtc'
import qrScan from './modules/qrScan'
import qrCode from './modules/qrCode'
import connectivity from './modules/connectivity'
import logger from './modules/logger'
import actions from './modules/actions'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
	modules: {
		appLock,
		swtc,
		qrScan,
		qrCode,
		logger,
		connectivity,
		actions
	},
	state: {
		debug: debug,
	},
	strict: debug,
	created () {
		console.log("store created")
	}
})

Vue.prototype.$store = store

export default store
