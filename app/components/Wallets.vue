<template>
	<Frame>
	    <Page ref="walletspage" class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
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
					<TextField class="m-x-20 p-10" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="'enter secret'" v-model="wallet.secret" />
					<TextField class="m-x-20 p-10" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="'name this wallet'" v-model="wallet.display" />
					<Button class="btn btn-primary ion" :text="'ion-md-qr-scanner' | fonticon" @tap="onScanSecret" />
					<Button :isEnabled="wallet.secret !== '' && wallet.display !== ''" class="btn btn-primary" :text="'import wallet'" @tap="onImportWallet" />
				</StackLayout>
				<StackLayout row="1" :visibility="importing && settingpassword ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="64" :hint="'set encrypt password'" @focus="message=''" @textChange="onSet" v-model="password" />
					<TextField class="passwod m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="'set encrypt password'"  @focus="message=''" @textChange="onSet" v-model="password2" />
					<Button :visibility="settingpassword ? 'visible' : 'collapse'"  :isEnabled="enabled" verticalAlignment="middle" class="btn btn-primary" :text="'set password'" @tap="onSetPassword" />
				</StackLayout>
				<Button row="2" :visibility="!importing ? 'visible' : 'collapse'" class="btn btn-primary" verticalAlignment="middle" :text="'import wallets'" @tap="importing=true" />
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
				importing: false,
				settingpassword: false,
				password: '',
				password2: '',
				enabled: false,
				message: '',
				wallet: {address: '', secret: '', display: ''}
			}
		},
		methods: {
			onItemTap(event) {
				console.log("You tapped: " + this.$store.getters.swtcWallets[event.index].address)
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
			onSetPassword () {
				console.log("encrypt Wallet")
				if (this.password !== this.password2) {
					this.message = 'same password needed'
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = "simple password not safe"
					this.enabled = false
				} else {
					this.$store.dispatch('showToasts', 'wallet imported and encrypted')
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
					this.message = 'same password needed'
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = "simple password not safe"
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
</style>
