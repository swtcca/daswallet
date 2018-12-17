<template>
	<Frame>
		<Page ref="signpage" class="page"  actionBarHidden="true" backgroundSpanUnderStatusBar="true" @loaded="statusBarAndroid">
	
	        <GridLayout rows="auto,*" columns="*">
	           	<Label row="0" class="ion big-ion text-right" :text="'ion-ios-close-circle-outline' | fonticon" @tap="$modal.close"/>
	        	<StackLayout row="1" verticalAlignment="middle">
					<Button class="btn btn-primary" :isEnabled="enabled" :text="button_sign" @tap="onSign" />
					<Button class="btn btn-primary ion" :text="'ion-md-qr-scanner' | fonticon" @tap="onScanTransaction" />
					<TextView class="m-x-20 m-y-5 p-5"  minHeight="80" editable="false" :hint="hint_signed_data" v-model="signed" />
					<TextView class="m-x-20 m-y-5 p-5"  minHeight="60" editable="false" :hint="hint_signature" v-model="signature" />
					<TextField class="password m-x-20 m-y-5 p-5" autocorrect="false" autocapitalizationType="none" :hint="hint_data_to_sign" v-model="tx_json" />
					<TextField class="password m-x-20 m-y-5 p-5" secure="true" autocorrect="false" autocapitalizationType="none" :hint="hint_decrypt_password" v-model="password" />
					<DropDown class="m-x-20 m-t-20" ref="dropdown" row="0" :hint="hint_select_wallet_to_sign_with" selectedIndex="0" :items="$store.getters.swtcWallets.map(w => w.address)"  @selectedIndexChanged="onSelect" />
				</StackLayout>
			</GridLayout>
		</Page>
	</Frame>
</template>

<script>
	const localize = require("nativescript-localize")
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	import statusBar from '~/mixins/statusBar'
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec, statusBar ],
		data () {
			return {
				button_sign: localize('buttons.sign'),
				hint_signed_data: localize("hints.signedData"),
				hint_data_to_sign: localize("hints.dataToSign"),
				hint_signature: localize("hints.signature"),
				hint_decrypt_password: localize("hints.decryptPassword"),
				hint_select_wallet_to_sign_with: localize("hints.selectWalletToSignWith"),
				walletIndex: 0,
				password: '',
				tx_json: '',
				signed: '',
				signature: ''
			}
		},
		created() {
		},
		computed: {
			enabled: {
				get () { return this.password !== '' && this.tx_json !== '' && this.$store.getters.swtcWallets.length > 0 },
			}
		},
		methods: {
			onSign () {
				console.log("sign transaction")
				console.log(this.walletIndex)
				console.log(this.password)
				try {
					let useWallet = this.$store.getters.swtcWallets[this.walletIndex]
					let signWallet = new this.Wallet(this.decrypt(useWallet.secret_encrypted, this.password))
					console.log(signWallet.address())
					console.log(signWallet.secret())
					this.signed = signWallet.signTx(this.tx_json)
					this.signature = 'signature'
				} catch (e) {
					alert("you likely specified wrong password")
				}
				this.password = ''
			},
			onSelect(args) {
				this.walletIndex = args.newIndex
				this.$refs.dropdown.nativeView.close()
			},
			onScanTransaction(args) {
				this.$store.dispatch('qrScan').then(
				   (result) => {
						console.log(result)
						console.log("Scan format: " + result.format)
						console.log("Scan text:   " + result.text)
						this.tx_json = result.text
				   },
				   (error) => {
						console.log("No scan: " + error);
				   }
		  		)
			},
		}
	}
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
	.page {
		background: rgb(13,73,127);
		background: linear-gradient(180deg, rgba(13,73,127,1) 0%, rgba(20,116,182,1) 12%, rgba(0,212,255,1) 82%);
	}
	.action-bar {
		horizontal-align: center;
	}
    .fa {
        color: $accent-dark;
    }
	.big-ion {
		font-size: 48;
	}
	.blue-sep {
		background-color: blue;
	}
</style>
