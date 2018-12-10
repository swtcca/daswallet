<template>
	<Frame>
		<Page ref="walletpage" class="page"  actionBarHidden="true" backgroundSpanUnderStatusBar="true" @loaded="statusBarAndroid">
	        <ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
	            <Label class="text-center action-bar-title" :text="'app.name'"></Label>
				<ActionItem ios.position="right">
	            	<Label class="ion" :text="'ion-ios-close-circle' | fonticon" @tap="$modal.close"/>
				</ActionItem>
	        </ActionBar>
	
	        <GridLayout rows="auto,*,auto" columns="*">
	           	<Label row="0" class="ion big-ion text-right" :text="'ion-ios-close-circle-outline' | fonticon" @tap="$modal.close"/>
				<StackLayout row="1" :visibility="!importing && $store.getters.swtcWallets.length > 0 ? 'visible' : 'collapse'" verticalAlignment="middle">
				<ScrollView height="100%">
					<ListView for="item in $store.getters.swtcWallets" class="list-group" @itemTap="onItemTap">
						<v-template>
							<GridLayout class="list-group-item" rows="*" columns="auto, *">
								<Label row="0" col="1" :text="item.address" />
							</GridLayout>
						</v-template>
					</ListView>
				</ScrollView>
				</Stacklayout>
				<StackLayout row="1" :visibility="importing && !settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="hint_secret" v-model="wallet.secret" />
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_name_wallet" v-model="wallet.display" />
					<Button class="btn btn-primary ion" :text="'ion-md-qr-scanner' | fonticon" @tap="onScanSecret" />
					<Button :isEnabled="wallet.secret !== '' && wallet.display !== ''" class="btn btn-primary" :text="button_import_wallet" @tap="onImportWallet" />
				</StackLayout>
				<StackLayout row="1" :visibility="importing && settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="hint_encrypt_password" @focus="message=''" @textChange="onSet" v-model="password" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_encrypt_password_again"  @focus="message=''" @textChange="onSet" v-model="password2" />
					<Button :isEnabled="enabled" verticalAlignment="middle" class="btn btn-primary" :text="button_encrypt_secret" @tap="onEncryptSecret" />
				</StackLayout>
				<Button row="2" :visibility="!importing ? 'visible' : 'collapse'" class="btn btn-primary" verticalAlignment="middle" :text="button_import_wallet" @tap="onImportStart" />
			</GridLayout>
		</Page>
	</Frame>
</template>

<script>
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	const localize = require("nativescript-localize")
	import statusBar from '~/mixins/statusBar'
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec, statusBar ],
		props: {
			importing: {
				type: Boolean,
				default: false
			}

		},
		data () {
			return {
				button_import_wallet: '',
				button_encrypt_secret: '',
				hint_secret: '',
				hint_name_wallet: '',
				hint_encrypt_password: '',
				hint_encrypt_password_again: '',
				//importing: false,
				settingpassword: false,
				password: '',
				password2: '',
				enabled: false,
				message: '',
				wallet: {address: '', secret: '', display: ''}
			}
		},
		created() {
				this.button_import_wallet = localize('buttons.importWallet')
				this.button_encrypt_secret = localize('buttons.encryptSecret')
				this.hint_secret = localize('hints.enterSecret')
				this.hint_name_wallet = localize('hints.nameWallet')
				this.hint_encrypt_password = localize('hints.setEncryptPassword')
				this.hint_encrypt_password_again = localize('hints.setEncryptPasswordAgain')
		},
		methods: {
			onItemTap(event) {
				console.log("You tapped: " + this.$store.getters.swtcWallets[event.index].address)
			},
			onImportStart () {
				this.importing = true
				this.wallet = {address: '', secret: '', display: ''}
				this.password = ''
				this.password2 = ''
				this.message = ''
			},
			onImportWallet () {
				console.log("import Wallet")
				let testWallet
				try {
					testWallet = new this.Wallet(this.wallet.secret)
					this.wallet.address = testWallet.address()
					//this.importing = false
					this.settingpassword = true
				} catch (e) {
					console.log("secret invalid")
				}

			},
			onEncryptSecret () {
				console.log("encrypt Wallet")
				if (this.password !== this.password2) {
					this.message = localize('messages.passwordDifferenet')
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = localize("messages.passwordSimple")
					this.enabled = false
				} else {
					this.$store.dispatch('showToasts', localize('messages.encryptedImported'))
					this.wallet.secret_encrypted = this.encrypt(this.wallet.secret, this.password)
					this.wallet.secret = ''
					this.$store.commit('addSwtcWallet', this.wallet)
					this.$store.commit('saveSwtcWallets')
					this.password = ''
					this.password2 = ''
					this.importing = false
					this.settingpassword = false
				}
			},
			onScanSecret(args) {
				this.$store.dispatch('qrScan').then(
				   (result) => {
						console.log(result)
						console.log("Scan format: " + result.format)
						console.log("Scan text:   " + result.text)
						this.wallet.secret = result.text
				   },
				   (error) => {
						console.log("No scan: " + error);
				   }
		  		)
			},
			onSet () {
				if (this.password !== this.password2) {
					this.message = localize('messages.passwordDifferent')
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = localize("messages.passwordSimple")
					this.enabled = false
				} else {
					this.message = ''
					this.enabled = true
				}
			}
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
	.error {
		color: white;
		font-size: 20;
		margin: 20;
		horizontal-align: center;
	}
	TextField {
		border_width: 1;
	}
</style>
