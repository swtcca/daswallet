<template>
	<Frame>
		<Page ref="walletpage" class="page"  actionBarHidden="true" backgroundSpanUnderStatusBar="true" @loaded="statusBarAndroid">
	        <GridLayout rows="auto,*,auto" columns="*">
	           	<Label row="0" class="ion big-ion text-right" :text="'ion-ios-close-circle-outline' | fonticon" @tap="onClose" />
				<StackLayout row="1" :visibility="!importing && !creating && $store.getters.swtcWallets.length > 0 ? 'visible' : 'collapse'" verticalAlignment="middle">
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
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="hint_secret_import" v-model="wallet.secret" />
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_name_wallet" v-model="wallet.display" />
					<Button class="btn btn-primary ion" :text="'ion-md-qr-scanner' | fonticon" @tap="onScanSecret" />
					<Button :isEnabled="wallet.secret !== '' && wallet.display !== ''" class="btn btn-primary" :text="button_import_wallet" @tap="onImportWallet" />
				</StackLayout>
				<StackLayout row="1" :visibility="importing && settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="hint_encrypt_password" @focus="message=''" @textChange="onSet" v-model="password" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_encrypt_password_again"  @focus="message=''" @textChange="onSet" v-model="password2" />
					<Button :isEnabled="enabled" verticalAlignment="middle" class="btn btn-primary" :text="button_encrypt_secret" @tap="onEncryptSecret('import')" />
				</StackLayout>
				<StackLayout row="1" :visibility="creating && !settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<Label class="m-x-20 m-y-5 p-y-5" :hint="hint_address" :text="wallet.address" />
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" editable="false" maxLength="64" :hint="hint_secret_create" v-model="wallet.secret" />
					<TextField class="m-x-20 m-y-5 p-y-5" ios:style="border-bottom-width:1" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_name_wallet" v-model="wallet.display" />
					<Button class="btn btn-primary" :text="'Generate'" @tap="onGenerateSecret" />
					<Button :isEnabled="wallet.secret !== '' && wallet.display !== ''" class="btn btn-primary" :text="button_create_wallet" @tap="onCreateWallet" />
				</StackLayout>
				<StackLayout row="1" :visibility="creating && settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="hint_encrypt_password" @focus="message=''" @textChange="onSet" v-model="password" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_encrypt_password_again"  @focus="message=''" @textChange="onSet" v-model="password2" />
					<Button :isEnabled="enabled" verticalAlignment="middle" class="btn btn-primary" :text="button_encrypt_secret" @tap="onEncryptSecret('create')" />
				</StackLayout>
				<StackLayout row="2" :visibility="!creating && !importing ? 'visible' : 'collapse'">
					<Button class="btn btn-primary" verticalAlignment="middle" :text="button_import_wallet" @tap="onImportStart" />
					<Button class="btn btn-primary" verticalAlignment="middle" :text="button_create_wallet" @tap="onCreateStart" />
				</StackLayout>
			</GridLayout>
		</Page>
	</Frame>
</template>

<script>
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	import fancyAlert from '~/mixins/fancyAlert'
	const localize = require("nativescript-localize")
	import statusBar from '~/mixins/statusBar'
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec, statusBar, fancyAlert ],
		data () {
			return {
				button_import_wallet: '',
				button_create_wallet: '',
				button_encrypt_secret: '',
				hint_address: '',
				hint_secret_import: '',
				hint_secret_create: '',
				hint_name_wallet: '',
				hint_encrypt_password: '',
				hint_encrypt_password_again: '',
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
				this.button_create_wallet = localize('buttons.createWallet')
				this.button_encrypt_secret = localize('buttons.encryptSecret')
				this.hint_address = localize('hints.address')
				this.hint_secret_import = localize('hints.enterSecret')
				this.hint_secret_create = localize('hints.generateSecret')
				this.hint_name_wallet = localize('hints.nameWallet')
				this.hint_encrypt_password = localize('hints.setEncryptPassword')
				this.hint_encrypt_password_again = localize('hints.setEncryptPasswordAgain')
		},
		computed: {
			importing: {
				get () { return this.$store.getters.importing },
				set (v) { this.$store.commit('setImporting', v) }
			},
			creating: {
				get () { return this.$store.getters.creating },
				set (v) { this.$store.commit('setCreating', v) }
			}
		},
		methods: {
			onClose() {
				//this.$store.commit('setCreating',false)
				//this.$store.commit('setImporting',false)
				this.cleanup()
				this.$modal.close()
			},
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
			onCreateStart () {
				this.creating = true
				this.wallet = {address: '', secret: '', display: ''}
				this.password = ''
				this.password2 = ''
				this.message = ''
			},
			onImportWallet () {
				console.log("import Wallet")
				let testWallet
				if (this.wallet.secret.startsWith('s') && s.length > 10) {
					try {
						testWallet = new this.Wallet(this.wallet.secret)
						this.wallet.address = testWallet.address()
						//this.importing = false
						this.settingpassword = true
					} catch (e) {
						console.log("secret invalid")
						this.wallet.secret = ''
						this.tnsFaAlert.showInfo(
						  "注意",
						  "密钥不正确",
						  "知道"
						)
					}
				} else {
					console.log("secret invalid")
					this.wallet.secret = ''
					this.tnsFaAlert.showInfo(
					  "注意",
					  "密钥不正确",
					  "知道"
					)
				}
			},
			onCreateWallet () {
				console.log("create Wallet")
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
			onEncryptSecret (action='import') {
				console.log("encrypt Wallet")
				if (this.password !== this.password2) {
					this.message = localize('messages.passwordDifferenet')
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = localize("messages.passwordSimple")
					this.enabled = false
				} else {
					if (action === 'import') {
						this.$store.dispatch('showToasts', localize('messages.encryptedImported'))
					} else if (action === 'create') {
						this.$store.dispatch('showToasts', localize('messages.encryptedCreated'))
					} else {
						alert('unknown action for encryption')
					}
					this.wallet.secret_encrypted = this.encrypt(this.wallet.secret, this.password)
					this.wallet.secret = ''
					this.$store.commit('addSwtcWallet', this.wallet)
					this.$store.commit('saveSwtcWallets')
					this.cleanup()
				}
			},
			cleanup () {
				this.wallet = Object.assign({}, {address: '', secret: '', display: ''})
				this.password = ''
				this.password2 = ''
				this.importing = false
				this.creating = false
				this.settingpassword = false
				this.statusBarAndroid()
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
			onGenerateSecret(args) {
				let testWallet = this.Wallet.generate()
				this.wallet = Object.assign({}, {address: testWallet.address, secret: testWallet.secret})
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
