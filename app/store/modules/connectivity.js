const connectivityModule = require("tns-core-modules/connectivity")

export default {
	state: {
		_connectionType: connectivityModule.getConnectionType()
	},
	getters: {
		connectionType: (state) => state._connectionType
	},
	mutations: {
		setConnectionType: (state, v) => state._connectionType = v
	},
	actions: {
	},
	created () {
		console.log('store connectivity created')
	}
}
