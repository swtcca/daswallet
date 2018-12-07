<template>
	<Frame>
	    <Page ref="signpage" class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
	        <ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
	            <Label class="text-center action-bar-title" :text="'app.name'"></Label>
				<ActionItem ios.position="right">
	            	<Label class="ion" :text="'ion-ios-close-circle' | fonticon" @tap="$modal.close"/>
				</ActionItem>
	        </ActionBar>
	
	        <GridLayout rows="auto,*" columns="*">
	           	<Label row="0" class="ion big-ion text-right" :text="'ion-ios-close-circle-outline' | fonticon" @tap="$modal.close"/>
	        	<StackLayout row="1" verticalAlignment="middle">
					<Button class="btn btn-primary" :isEnabled="enabled" :text="'Sign'" @tap="onSign" />
					<Button class="btn btn-primary ion" :text="'ion-md-qr-scanner' | fonticon" @tap="onScanTransaction" />
					<TextField class="m-x-10 p-x-10"  editable="false" :hint="'signed data'" v-model="signed" />
					<TextField class="m-x-10 p-x-10"  editable="false" :hint="'signature'" v-model="signature" />
					<TextField class="m-x-10 p-x-10" autocorrect="false" autoCapitalizationType="none" :hint="'scan tx data to sign'" v-model="tx_json" />
					<TextField class="password m-x-10 p-x-10" autocorrect="false" autoCapitalizationType="none" :hint="'password to decrypt wallet'" v-model="password" />
					<DropDown class="m-x-20 m-t-20" ref="dropdown" row="0" :hint="'select wallet to sign with...'" selectedIndex="0" :items="$store.getters.swtcWallets.map(w => w.address)"  @selectedIndexChanged="onSelect" />
				</StackLayout>
			</GridLayout>
		</Page>
	</Frame>
</template>

<script>
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec ],
		data () {
			return {
				walletIndex: 0,
				password: '',
				tx_json: '',
				signed: '',
				signature: ''
			}
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
