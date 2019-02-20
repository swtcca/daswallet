const JLib = require('swtc-wallet')

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
	},
	mounted () {
		console.log('mixins jingtumlib mounted self test')
		if (this.$store.state.debug) {
			console.log(this.swtcWallets)
			console.log(this.swtcWallet)
		}
		if (this.swtcWallets.length === 0 && !this.swtcWallet.hasOwnProperty('address')) {
			let wallet = this.Wallet.generate()
			wallet.display = 'automatic created wallet, can be deleted'
			console.log(wallet)
		} 
	},
}
