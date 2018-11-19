import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import swtc from './modules/swtc'
import qrScan from './modules/qrScan'
import qrCode from './modules/qrCode'
import connectivity from './modules/connectivity'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
	modules: {
		swtc,
		qrScan,
		qrCode,
		connectivity
	},
	state: {
	},
	strict: debug,
	created () {
		console.log("store created")
	}
})

Vue.prototype.$store = store

export default store
