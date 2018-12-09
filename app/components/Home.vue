<template>
	<Page ref="homepage" class="page" backgroundSpanUnderStatusBar="true" @loaded="pageLoaded">
		<ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
			<Label class="text-center action-bar-title" :text="'app.name'|L"></Label>
		</ActionBar>

		<GridLayout rows="auto,*" columns="*">
			<GridLayout row="0" rows="auto,auto,auto,auto" columns="*,*,*">
				<label row="0" col="0" colSpan="3" class="m-10 hr-light blue-sep"/>
				<Label row="1" col="0" class="big-ion text-center ion" :text="'ion-ios-settings' | fonticon" @tap="toggleVisibility('settings')" />
				<Label row="2" col="0" class="text-center" :text="navigation_settings" @tap="toggleVisibility('settings')" />
				<Label row="1" col="1" class="big-ion text-center ion" :text="'ion-md-wallet' | fonticon" @tap="toggleVisibility('wallets')" />
				<Label row="2" col="1" class="text-center" :text="navigation_wallets" @tap="toggleVisibility('wallets')" />
				<Label row="1" col="2" class="big-ion text-center ion" :text="'ion-ios-build' | fonticon" @tap="toggleVisibility('actions')" />
				<Label row="2" col="2" class="text-center" :text="navigation_actions" @tap="toggleVisibility('actions')" />
				<label row="3" col="0" colSpan="3" class="m-10 hr-light blue-sep" />
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visible_landing ? 'visible' : 'collapse'">
				<ScrollView height="100%">
					<StackLayout>
						<Button :text="'swtichLogin'" class="btn btn-primary" @tap="switchUnlocked" />
						<Label class="m-10 text-center t-20" textWrap="true" :text="'SECURE'" />
						<Label class="text-center t-16" textWrap="true" :text="'device login lock\napplication lock\nlocal encryption\noffline operation'" />
						<Label class="m-10 text-center t-20" textWrap="true" :text="'SUPPORT'" />
						<Label class="text-center t-16" textWrap="true" :text="'swtc'" />
					</Stacklayout>
				</ScrollView>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visible_wallets ? 'visible' : 'collapse'">
				<StackLayout row="0" col="0">
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label verticalAlignment="middle" class="m-20 big-ion ion" :text="'ion-md-wallet' | fonticon" @tap="$showModal($routes.Wallets, {fullscreen: true})" />
						<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
							<Label col="1" class="t-20 m-r-20" :text="'No Wallet'" />
						</GridLayout>
					</GridLayout>
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 big-ion text-center ion" :text="'ion-ios-arrow-dropright' | fonticon" />
						<Label col="1" verticalAlignment="middle" class="t-20" :text="'Import Wallet'" @tap="$showModal($routes.Wallets, {fullscreen: true, props: {importing: true}})" />
					</GridLayout>
				</StackLayout>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visible_actions ? 'visible' : 'collapse'">
				<StackLayout row="0" col="0">
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label verticalAlignment="middle" class="m-20 big-ion ion" :text="'ion-ios-build' | fonticon" />
						<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
							<Label col="1" class="t-20 m-r-20" :text="'cold wallet'" />
						</GridLayout>
					</GridLayout>
					<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
						<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 big-ion text-center ion" :text="'ion-ios-arrow-dropright' | fonticon" />
						<Label col="1" verticalAlignment="middle" class="t-20" :text="'Offline Sign'" @tap="onSignTransaction"/>
					</GridLayout>
				</StackLayout>
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*" :visibility="visible_settings ? 'visible' : 'collapse'">
				<ScrollView height="100%">
					<StackLayout row="0" col="0">
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" class="m-20 big-ion ion" :text="'ion-ios-settings' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Button col="1" :text="'saveConfig'" isEnabled="config_dirty" class="btn btn-primary" @tap="saveConfig" />
							</GridLayout>
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 big-ion ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0" verticalAlignment="middle" class="t-20" :text="'冷钱包'" />
								<Switch class="switch" col="1" verticalAlignment="middle" v-model="cold_wallet" />
							</GridLayout>
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 big-ion ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0"  verticalAlignment="middle" class="t-20" text="反馈" />
								<Switch class="switch" col="1" verticalAlignment="middle" v-model="autoFeedback" />
							</GridLayout>
						</GridLayout>
						<GridLayout verticalAlignment="middle" rows="auto" columns="auto,*">
							<Label col="0" verticalAlignment="middle" class="m-x-20 m-y-10 big-ion ion" :text="'ion-ios-arrow-dropright' | fonticon" />
							<GridLayout col="1" verticalAlignment="middle" rows="auto" columns="*,auto">
								<Label col="0"  verticalAlignment="middle" class="t-20" text="提示" />
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
				navigation_settings: '',
				navigation_wallets: '',
				navigation_actions: '',
				flag_password: null,
				visible_landing: true,
				visible_settings: false,
				visible_wallets: false,
				visible_actions: false,
				config_dirty: true,
				cold_wallet: false
				//auto_feedback: false,
				//auto_prompt: false
			}
		},
		created () {
			console.log("component home vue created")
			this.navigation_settings = localize('navigations.settings')
			this.navigation_wallets = localize('navigations.wallets')
			this.navigation_actions = localize('navigations.actions')
		},
		computed: {
			...mapGetters(['connectionType', 'app_unlocked']),
			message() {
				return "Blank {N}-Vue app"
			},
			crypto_result() {
				return this.crypto_encrypted
			}
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
			toggleVisibility(v) {
				this.visible_landing = false
				this.visible_settings = false
				this.visible_wallets = false
				this.visible_actions = false
				if (v === 'settings') {
					this.visible_settings = true
				} else if (v === 'wallets') {
					this.visible_wallets = true
				} else if (v === 'actions') {
					this.visible_actions = true
				} else {
					this.visible_landing = true
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
			pageLoaded(args) {
				console.log("home page loaded")
				this.statusBarAndroid(args)
				this.hardwareBackAndroid(args)
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
		font-size: 36;
	}
	.big-text {
		font-size: 24;
	}
	.blue-sep {
		background-color: blue;
	}
</style>
