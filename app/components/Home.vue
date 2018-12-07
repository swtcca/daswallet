<template>
	<Page ref="homepage" class="page" backgroundSpanUnderStatusBar="true" @loaded="pageLoaded">
		<ActionBar class="action-bar" flat="true" android:backgroundColor="transparent" ios:backgroundColor="rgb(13,73,127)">
			<Label class="text-center action-bar-title" :text="'app.name'|L"></Label>
		</ActionBar>

		<GridLayout rows="auto,*" columns="*">
			<GridLayout row="0" rows="auto,auto,auto,auto" columns="*,*,*">
				<label row="0" col="0" colSpan="3" class="m-10 hr-light blue-sep"/>
				<Label row="1" col="0" class="big-ion text-center ion" :text="'ion-ios-settings' | fonticon" @tap="onSetPassword" />
				<Label row="2" col="0" class="text-center" :text="'settings'|L" @tap="onSetPassword" />
				<Label row="1" col="1" class="big-ion text-center ion" :text="'ion-md-wallet' | fonticon" @tap="onImportWallet" />
				<Label row="2" col="1" class="text-center" :text="'wallets'|L" @tap="onImportWallet" />
				<Label row="1" col="2" class="big-ion text-center ion" :text="'ion-ios-build' | fonticon" @tap="onSignTransaction" />
				<Label row="2" col="2" class="text-center" :text="'signatures'" @tap="onSignTransaction" />
				<label row="3" col="0" colSpan="3" class="m-10 hr-light blue-sep" />
			</GridLayout>
			<GridLayout row="1" rows="*" columns="*">
				<ScrollView width="100%">
					<StackLayout>
						<Label class="m-10 text-center" android:style="font-size:16" ios:style="font-size:20;" textWrap="true" :text="'SECURE'" />
						<Label class="text-center" android:style="font-size:16" ios:style="font-size:20;" textWrap="true" :text="'device login lock\napplication lock\nlocal encryption\noffline operation\nno usb debug\nno bluetooth'" />
						<Label class="m-10 text-center" android:style="font-size:16" ios:style="font-size:20;" textWrap="true" :text="'SUPPORT'" />
						<Label class="text-center" android:style="font-size:16" ios:style="font-size:20;" textWrap="true" :text="'swtc\nxrp\nxlm\nether series\nbitcoin\neos'" />
						<Label class="text-center" android:style="font-size:16" ios:style="font-size:20;" textWrap="true" :text="'device login lock\napplication lock\nlocal encryption\noffline operation\nno usb debug\nno bluetooth'" />
					</Stacklayout>
				</ScrollView>
				<!--
				<Fab
					@tap="fabTap"
					icon="ic_menu_add"
					rippleColor="#f1f1f1"
					class="fab-button">
				</Fab>
				-->
			</GridLayout>
		</GridLayout>
	</Page>
</template>

<script>
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	import statusBar from '~/mixins/statusBar'
	import Settings from './Settings'
	import Wallets from './Wallets'
	import Sign from './Sign'
	import { mapGetters, mapMutations, mapActions } from "vuex";
	export default {
		mixins: [ jingtumBaseLib, cryptoEncDec, statusBar ],
		data () {
			return {
				flag_password: null,
			}
		},
		computed: {
			...mapGetters(['connectionType']),
			message() {
				return "Blank {N}-Vue app"
			},
			crypto_result() {
				return this.crypto_encrypted
			}
		},
		watch: {
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
				this.$showModal(Wallets, {fullscreen: true})
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
		created () {
			console.log("component home vue created")
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
	.blue-sep {
		background-color: blue;
	}
</style>
