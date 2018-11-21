import * as applicationSettings from "tns-core-modules/application-settings"

export default {
	state: {
			_hash_master_password: applicationSettings.getString('HASHMASTERPASSWORD', ''),
			_app_timestamp: applicationSettings.getNumber('APPTIMESTAMP', new Date().getTime()),
			_app_unlocked: false,
	},

	getters: {
		hash_master_password: (state) => state._hash_master_password,
		app_locked: (state) => state._app_locked,
		app_timestamp: (state) => state._app_timestamp
	},

	mutations: {
		setAppTimestamp: (state, v) => state._app_timestamp = v,
		saveAppTimestamp: (state) => applicationSettings.setNumber('APPTIMESTAMP', JSON.stringify(state._app_timestamp)),
		setHashMasterPassword: (state, v) => state._hash_master_password = v,
		saveHashMasterPassword: (state) => applicationSettings.setString('HASHMASTERPASSWORD', JSON.stringify(state._hash_master_password)),
	},

	actions: {
	},

	created () {
		console.log('store appLock created')
	}
}
