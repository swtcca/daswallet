<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'app.name'"></Label>
        </ActionBar>

        <GridLayout rows="*,*,*" columns="*">
			<Button row="0" class="w-full p-2 btn btn-primary btn-rounded-sm" :text="'set.password'" @tap="onSetPassword" />
			<Button row="1" class="w-full p-2 btn btn-primary btn-rounded-sm" :text="'import.wallet'" @tap="onImportWallet" />
			<Button row="2" class="w-full p-2 btn btn-primary btn-rounded-sm" :text="'sign.transaction'" @tap="onSignTransaction" />
			<Fab
				@tap="fabTap"
				row="2"
				icon="ic_menu_add"
				rippleColor="#f1f1f1"
				class="fab-button">
			</Fab>
        </GridLayout>
    </Page>
</template>

<script>
	import jingtumBaseLib from '~/mixins/jingtumBaseLib'
	import cryptoEncDec from '~/mixins/cryptoEncDec'
	import { mapGetters, mapMutations, mapActions } from "vuex";
    export default {
		mixins: [ jingtumBaseLib, cryptoEncDec ],
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
			},
			onImportWallet() {
			},
			onSignTransaction() {
			}
		},
		created () {
			console.log("component home vue created")
		},
		mounted () {
			console.log('mounted')
		}
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }
</style>
