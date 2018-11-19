require('nativescript-nodeify/nodeify')
const JLib = require('jingtum-base-lib')

export default {
	data () {
		return {
			Wallet: JLib.Wallet,
			KeyPair: JLib.KeyPair
		}
	},
	computed: {
		swtcWallets: {
			get () { return this.$store.getters.swtcWallets },
			set (v) { this.$store.commit('addSwtcWallet',v) ; this.$store.commit('saveSwtcWallets')}
		},
		swtcWallet: {
			get () { return this.$store.getters.swtcWallet },
			set (v) { this.$store.commit('setSwtcWallet', v); this.$store.commit('saveSwtcWallet') }
		},
	},
	watch: {
	},
	methods: {
		swtcClassWallet(secret) {
			return new this.Wallet(secret)
		},
		swtcNewWallet(secret=false) {
			if (secret) {
				return this.Wallet.fromSecret(secret)
			} else {
				return this.Wallet.generate()
			}
		},
	},
	created () {
		console.log('mixins jingtumlib created')
	}
}
