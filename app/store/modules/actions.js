export default {
	state: {
			_importing: false,
			_importingWatch: false,
			_creating: false,
			_coldWallet: false
	},

	getters: {
		importing: (state) => state._importing,
		importingWatch: (state) => state._importingWatch,
		creating: (state) => state._creating,
		coldWallet: (state) => state._coldWallet
	},

	mutations: {
		setImporting: (state, v) => state._importing = v,
		setImportingWatch: (state, v) => state._importingWatch = v,
		setCreating: (state, v) => state._creating = v,
		setColdWallet: (state, v) => state._coldWallet = v
	},

	actions: {
	},

	created () {
		console.log('store actions created')
	}
}
