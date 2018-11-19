import * as applicationSettings from "tns-core-modules/application-settings"

const state = {
	_swtcWallets: JSON.parse(applicationSettings.getString('SWTCWALLETS') || '[]'),
	_swtcWallet: JSON.parse(applicationSettings.getString('SWTCWALLET') || '{}'),
 }
const getters = {
	swtcWallets: (state) => state._swtcWallets,
	swtcWallet: (state) => state._swtcWallet,
}
const mutations = {
	addSwtcWallet: (state, v) => { if (state._swtcWallets.filter(e => e.address === v.address).length < 1)  { state._swtcWallets.unshift(v) } },
	removeSwtcWallet: (state, v) => state._swtcWallets.splice(state._swtcWallets.indexOf(v),1),
	setSwtcWallet: (state, v) => state._swtcWallet = Object.assign({}, {address: v.address, secret: v.secret}),
	saveSwtcWallets: (state) => applicationSettings.setString('SWTCWALLETS', JSON.stringify(state._swtcWallets)),
	saveSwtcWallet: (state) => applicationSettings.setString('SWTCWALLET', JSON.stringify(state._swtcWallet)),
}
const actions = {
}
export default {
	state,
	getters,
	mutations,
	actions,
	created () {
		console.log("store swtc created")
	}
}
