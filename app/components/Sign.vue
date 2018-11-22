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
					<Label class="h-100 p-10" text="'tx data to sign'" />
					<Label class="h-100 p-10" text="'signed data'" />
					<Button class="btn btn-primary" :text="'copy'" />
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
			return {}
		},
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
