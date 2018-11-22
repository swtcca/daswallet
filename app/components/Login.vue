<template>
	<Page ref="loginpage" class="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
	    <ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
	        <Label class="text-center action-bar-title" :text="'app.name'"></Label>
			<ActionItem ios.position="right">
	        	<Label class="ion" :text="'ion-ios-close-circle' | fonticon" @tap="$modal.close"/>
			</ActionItem>
	    </ActionBar>
	
	    <GridLayout rows="auto,*" columns="*">
	    	<StackLayout row="1" :visibility="password_set ? 'visible' : 'collapse'" verticalAlignment="middle">
				<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
				<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" maxLength="32" :hint="'enter password'" @textChange="onLoginReset" v-model="login_password" />
				<Button :isEnabled="enabled" class="btn btn-primary" :text="'login'" @tap="onLogin" />
			</StackLayout>
	    	<StackLayout row="1" :visibility="!password_set ? 'visible' : 'collapse'" verticalAlignment="middle">
				<Label class="error" :visibility="!!message ? 'visible': 'collapse'" :text="message" />
				<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" maxLength="32" :hint="'enter password'" @focus="message=''" @textChange="onSet" v-model="password" />
				<TextField class="password m-x-20 p-10" secure="true" autocorrect="false" maxLength="32" :hint="'enter password again'" @focus="message=''" @textChange="onSet" v-model='password2' />
				<Button class="btn btn-primary" :isEnabled="enabled" :text="'set password'" @tap="onSetPassword" />
			</StackLayout>
		</GridLayout>
	</Page>
</template>

<script>
	import cryptoEncDec from '~/mixins/cryptoEncDec'
    export default {
		mixins: [ cryptoEncDec ],
		data () {
			return {
				login_password: '',
				password_set: false,
				password: '',
				password2: '',
				message: '',
				enabled: false
			}
		},
		methods: {
			onSetPassword () {
				console.log("set pass pressed")
				this.$store.dispatch('showToasts', 'password set')
				this.$store.commit('setHashMasterPassword', this.hash_sha256(this.password))
				this.$store.commit('saveHashMasterPassword')
				this.password_set = true
				this.password = ''
				this.password2 = ''
				//this.$navigateTo(this.$routes.Home, { clearHistory: true })
			},
			onLogin () {
				console.log("login")
				if (this.$store.getters.hash_master_password === this.hash_sha256(this.login_password)) {
					this.$store.commit('setAppUnlocked', true)
					this.$store.commit('setAppTimestamp', new Date().getTime())
					this.$store.dispatch('showToasts', 'login successful')
					this.$navigateTo(this.$routes.Home, { clearHistory: true })
				} else {
					console.log(this.$store.getters.hash_master_password)
					console.log(this.hash_sha256(this.login_password))
					this.message = "login failed"
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
		},
		created () {
			console.log("modal page settings created")
			if (this.$store.getters.hash_master_password !== '') {
				this.password_set = true
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
