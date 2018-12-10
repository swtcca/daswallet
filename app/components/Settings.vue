<template>
	<Frame>
		<Page ref="settingspage" class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true" @loaded="statusBarAndroid">
	        <ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
	            <Label class="text-center action-bar-title" :text="'app.name'"></Label>
				<ActionItem ios.position="right">
	            	<Label class="ion" :text="'ion-ios-close-circle' | fonticon" @tap="$modal.close"/>
				</ActionItem>
	        </ActionBar>
	
	        <GridLayout rows="auto,*" columns="*">
	           	<Label row="0" :visibility="$store.getters.app_unlocked && password_set ? 'visible' : 'collapse'" class="ion big-ion text-right" :text="'ion-ios-close-circle-outline' | fonticon" @tap="$modal.close"/>
	        	<StackLayout row="1" :visibility="password_set ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_enter_password" @textChange="onLoginReset" v-model="login_password" @returnPress="onReset" />
					<Button :isEnabled="enabled" class="btn btn-primary" :text="button_reset_password" @tap="onReset" />
				</StackLayout>
	        	<StackLayout row="1" :visibility="!password_set ? 'visible' : 'collapse'" verticalAlignment="middle">
					<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
					<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_enter_password" @focus="message=''" @textChange="onSet" v-model="password" />
					<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" autocapitalizationType="none" maxLength="32" :hint="hint_enter_password_again" @focus="message=''" @textChange="onSet" v-model='password2' @returnPress="onSetPassword" />
					<Button class="btn btn-primary" :isEnabled="enabled" :text="button_set_password" @tap="onSetPassword" />
				</StackLayout>
			</GridLayout>
		</Page>
	</Frame>
</template>

<script>
	const localize = require("nativescript-localize")
	import statusBar from '~/mixins/statusBar'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
    export default {
		mixins: [ cryptoEncDec, statusBar ],
		data () {
			return {
				hint_enter_password: '',
				hint_enter_password_again: '',
				button_set_password: '',
				button_reset_password: '',
				button_login: '',
				login_password: '',
				password_set: false,
				password: '',
				password2: '',
				message: '',
				enabled: false
			}
		},
		created () {
			console.log("modal page settings created")
			if (this.$store.getters.hash_master_password !== '') {
				this.password_set = true
			}
			this.hint_enter_password = localize('hints.enterPassword')
			this.hint_enter_password_again = localize('hints.enterPasswordAgain')
			this.button_set_password = localize('buttons.setPassword')
			this.button_reset_password = localize('buttons.resetPassword')
			this.button_login = localize('buttons.login')
		},
		methods: {
			onSetPassword () {
				console.log("set pass pressed")
				if (this.password !== this.password2) {
					this.message = localize('messages.passwordDifferent')
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = localize('messages.passwordSimple')
					this.enabled = false
				} else {
					this.$store.dispatch('showToasts', localize('messages.passwordSet'))
					this.$store.commit('setHashMasterPassword', this.hash_sha256(this.password))
					this.$store.commit('saveHashMasterPassword')
					this.logged_in = true
					this.password_set = true
					this.password = ''
					this.password2 = ''
					this.$modal.close()
				}
			},
			onReset () {
				console.log("reset")
				if (this.$store.getters.hash_master_password === this.hash_sha256(this.login_password)) {
					this.$store.commit('setAppUnlocked', true)
					this.password_set = false
					this.$store.commit('setAppTimestamp', new Date().getTime())
					this.$store.dispatch('showToasts', localize('messages.resetPassword'))
				} else {
					console.log(this.$store.getters.hash_master_password)
					console.log(this.hash_sha256(this.login_password))
					this.message = localize('messages.loginFail')
					this.$store.dispatch('showToasts', localize('messages.loginFail'))
				}
				this.login_password = ''
			},
			onLoginReset () {
				if (this.login_password.length < 4) {
					this.enabled = false
				} else {
					this.enabled = true
				}
			},
			onSet () {
				if (this.password !== this.password2) {
					this.message = localize('messages.passwordDifferent')
					this.enabled = false
				} else if (this.password.length < 4) {
					this.message = localize('messages.passwordSimple')
					this.enabled = false
				} else {
					this.message = ''
					this.enabled = true
				}
			}
		},
		mounted () {
			console.log("modal page settings mounted")
			console.log(this.$store.getters.app_timestamp)
			console.log(this.$store.getters.hash_master_password)
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
