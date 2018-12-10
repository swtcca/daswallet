<template>
	<Page ref="homepage" class="page"  actionBarHidden="true" backgroundSpanUnderStatusBar="true" @navigatingFrom="pageStatusBar" @navigatedFrom="pageStatusBar" @loaded="pageLoaded">

		<GridLayout rows="auto,*,auto" columns="*">
			<GridLayout row="0" rows="auto,auto" columns="*">
				<Label row="0" class="p-t-30 text-center h2" style="color:white;" :text="actionbar_title" />
				<label row="1" class="hr-light blue-sep"/>
			</GridLayout>
			<GridLayout row="2" rows="auto,auto,auto" columns="*,*,*,*">
				<label row="0" col="0" colSpan="4" class="hr-light blue-sep"/>
				<Label row="1" col="0" class="big-ion-nav text-center ion" :text="'ion-ios-settings' | fonticon" @tap="currentTab='settings'" />
				<Label row="1" col="1" class="big-ion-nav text-center ion" :text="'ion-md-wallet' | fonticon" @tap="currentTab='wallets'" />
				<Label row="1" col="2" class="big-ion-nav text-center ion" :text="'ion-ios-build' | fonticon" @tap="currentTab='actions'" />
				<Label row="1" col="3" class="big-ion-nav text-center ion" :text="'ion-ios-information-circle' | fonticon" @tap="currentTab='about'" />
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visibleTab('about') ? 'visible' : 'collapse'">
				<ScrollView height="100%">
					<StackLayout>
						<GridLayout verticalAlignment="middle" rows="auto,auto" columns="*,*,*">
							<Label row="0" col="0" verticalAlignment="middle" class="head-nav-left big-ion text-left ion" :text="'ion-ios-information-circle' | fonticon" />
							<Label row="0" col="2" verticalAlignment="middle" class="head-nav-right t-20 text-right" :text="navigation_about" />
							<label row="1" col="0" colSpan="3" class="hr-light m-x-20" />
						</GridLayout>
						<Button :text="'testUnlocked'" class="btn btn-primary" @tap="switchUnlocked" />
						<Label class="m-y-10 text-center t-20" textWrap="true" :text="'contents.secure'|L" />
						<StackLayout>
							<Label class="text-center t-16" textWrap="true" :text="'contents.deviceLock'|L" />
							<Label class="text-center t-16" textWrap="true" :text="'contents.applicationLock'|L" />
							<Label class="text-center t-16" textWrap="true" :text="'contents.localEncryption'|L" />
							<Label class="text-center t-16" textWrap="true" :text="'contents.offlineOperation'|L" />
						</StackLayout>
						<Label class="m-y-10 text-center t-20" textWrap="true" :text="'contents.support'|L" />
						<Label class="text-center t-16" textWrap="true" :text="'contents.swtc'|L" />
					</Stacklayout>
				</ScrollView>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visibleTab('wallets') ? 'visible' : 'collapse'">
				<StackLayout row="0" col="0">
					<GridLayout verticalAlignment="middle" rows="auto,auto" columns="*,*,*">
						<Label row="0" col="0" verticalAlignment="middle" class="head-nav-left big-ion text-left ion" :text="'ion-md-wallet' | fonticon" @tap="$showModal($routes.Wallets, {fullscreen: true})" />
						<Label row="0" col="1" verticalAlignment="middle" class="head-nav-center t-16 text-center" :text="'contents.noWallet'|L" />
						<Label row="0" col="2" verticalAlignment="middle" class="head-nav-right t-20 text-right" :text="navigation_wallets" />
						<label row="1" col="0" colSpan="3" class="hr-light m-x-20" />
					</GridLayout>
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 text-center ion" :text="'ion-ios-arrow-dropright' | fonticon" />
						<Label col="1" verticalAlignment="middle" class="t-20" :text="'contents.importWallet'|L" @tap="$showModal($routes.Wallets, {fullscreen: true, props: {importing: true}})" />
					</GridLayout>
				</StackLayout>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visibleTab('actions') ? 'visible' : 'collapse'">
				<StackLayout row="0" col="0">
					<GridLayout verticalAlignment="middle" rows="auto,auto" columns="*,*,*">
						<Label row="0" col="0" verticalAlignment="middle" class="head-nav-left big-ion text-left ion" :text="'ion-ios-build' | fonticon" />
						<Label row="0" col="1" verticalAlignment="middle" class="head-nav-center t-16 text-center" :text="'contents.coldWallet'|L" />
						<Label row="0" col="2" verticalAlignment="middle" class="head-nav-right t-20 text-right" :text="navigation_actions" />
						<label row="1" col="0" colSpan="3" class="hr-light m-x-20" />
					</GridLayout>
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 text-center ion" :text="'ion-ios-arrow-dropright' | fonticon" />
						<Label col="1" verticalAlignment="middle" class="t-20" :text="'contents.offlineSign'|L" @tap="onSignTransaction"/>
					</GridLayout>
				</StackLayout>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visibleTab('settings') ? 'visible' : 'collapse'">
				<ScrollView height="100%">
					<StackLayout row="0" col="0">
						<GridLayout verticalAlignment="middle" rows="auto,auto" columns="*,*,*">
							<Label row="0" col="0" verticalAlignment="middle" class="head-nav-left big-ion text-left ion" :text="'ion-ios-settings' | fonticon" />
							<Label row="0" col="1" verticalAlignment="middle" :text="button_save_config" class="head-nav-center t-16 text-center" @tap="saveConfig" />
							<Label row="0" col="2" verticalAlignment="middle" class="head-nav-right t-20 text-right" :text="navigation_settings" />
							<label row="1" col="0" colSpan="3" class="hr-light m-x-20" />
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0" verticalAlignment="middle" class="t-20" :text="'contents.coldWallet'|L" />
								<Switch class="switch" col="1" verticalAlignment="middle" v-model="cold_wallet" />
							</GridLayout>
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0"  verticalAlignment="middle" class="t-20" :text="'contents.autoFeedback'|L" />
								<Switch class="switch" col="1" verticalAlignment="middle" v-model="autoFeedback" />
							</GridLayout>
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0"  verticalAlignment="middle" class="t-20" :text="'contents.autoPrompt'|L" />
								<Switch class="switch" col="1" verticalAlignment="middle" v-model="autoPrompt" />
							</GridLayout>
						</GridLayout>
					</StackLayout>
				</ScrollView>
			</GridLayout>
		</GridLayout>
	</Page>
</template>

<script>
	const localize = require("nativescript-localize")
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	import statusBar from '~/mixins/statusBar'
	import fancyAlert from '~/mixins/fancyAlert'
	import feedback from '~/mixins/feedback'
	import Settings from './Settings'
	import Wallets from './Wallets'
	import Sign from './Sign'
	import Login from './Login'
	import { mapGetters, mapMutations, mapActions } from "vuex";
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec, statusBar, fancyAlert, feedback ],
		data () {
			return {
				actionbar_title: '',
				button_save_config: '',
				navigation_settings: '',
				navigation_wallets: '',
				navigation_actions: '',
				navigation_about: '',
				flag_password: null,
				visible_about: true,
				visible_settings: false,
				visible_wallets: false,
				visible_actions: false,
				config_dirty: true,
				cold_wallet: false,
				//auto_feedback: false,
				//auto_prompt: false
				tabs: ['settings', 'wallets', 'actions', 'about'],
				currentTab: 'about'
			}
		},
		created () {
			console.log("component home vue created")
			this.actionbar_title = localize('app.name')
			this.button_save_config = localize('buttons.saveConfig')
			this.navigation_settings = localize('navigations.settings')
			this.navigation_wallets = localize('navigations.wallets')
			this.navigation_actions = localize('navigations.actions')
			this.navigation_about = localize('navigations.about')
		},
		computed: {
			...mapGetters(['connectionType', 'app_unlocked']),
			message() {
				return "Blank {N}-Vue app"
			},
			crypto_result() {
				return this.crypto_encrypted
			},
		},
		watch: {
			app_unlocked (v) {
				console.log("login status change detected")
				console.log(v)
				if (!v) {
					this.tnsFaAlert.showInfo(
					  "注意",
					  "监测到网络连接，应用很快关闭",
					  "知道"
					).then(
						() => {
							//this.$showModal(Login, {fullscreen: true})
							this.$navigateTo(this.$routes.Login, { clearHistory: true })
						}
					)
				}
			},
			connectionType (v) {
				console.log("connection change detected")
				console.log(v)
				if (v !== 0) {
					alert('goes online, terminating app...')
				}
			}
		},
		methods: {
			...mapActions(['qrScan', 'qrEncode']),
			saveConfig () {
				console.log("save configuration tapped")
			},
			visibleTab (v) {
				if (v === this.currentTab) {
					return true
				} else {
					return false
				}
			},
			switchUnlocked() {
				this.$store.commit('setAppUnlocked', false)
			},
			onEnc () {
				console.log("encrypt")
				this.encrypt()
			},
			onDec () {
				console.log("decrypt")
				this.decrypt()
			},
			fabTap() {
				console.log("fabbutton tapped")
			},
			onSetPassword() {
				console.log("set password")
				this.$showModal(Settings, {fullscreen: true})
			},
			onImportWallet() {
				console.log("import wallet")
				this.$showModal(Wallets, {fullscreen: true, props: { importing: true }})
			},
			onSignTransaction() {
				console.log("sign transaction")
				this.$showModal(Sign, {fullscreen: true})
			},
			pageStatusBar(args) {
				console.log("statusBar called")
				this.statusBarAndroid(args)
			},
			pageLoaded(args) {
				console.log("home page loaded")
				this.hardwareBackAndroid(args)
				this.pageStatusBar(args)
			},
		},
		mounted () {
			console.log('mounted')
		},
	};
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
		padding-top: 24;
		horizontal-align: center;
	}
	.fa {
		color: $accent-dark;
	}
	.big-ion {
		font-size: 32;
	}
	.big-ion-nav {
		font-size: 40;
		margin-top: 1;
	}
	.big-text {
		font-size: 24;
	}
	.blue-sep {
		background-color: blue;
	}
	.head-nav-left {
		margin-left: 20;
		margin-top: 10;
		margin-bottom: 10;
	}
	.head-nav-right {
		margin-right: 20;
	}
	.head-nav-center {
	}
</style>
