import {BarcodeScanner} from "nativescript-barcodescanner"

export default {
	state: {
	},
	getters: {
		barcodescanner () {
		return new BarcodeScanner()
		}
	},
	actions: {
		qrScan ({getters, commit}) {
			console.log("scan")
			return getters.barcodescanner.scan({
				formats: "QR_CODE",	 // Pass in of you want to restrict scanning to certain types
				cancelLabel: "取消", // iOS only, default 'Close'
				cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
				message: "音量键切换闪光灯", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
				showFlipCameraButton: true,	 // default false
				preferFrontCamera: false,	 // default false
				showTorchButton: true,		// default false
				beepOnScan: true,			 // Play or Suppress beep on scan (default true)
				torchOn: false,				 // launch with the flashlight on (default false)
				closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
				resultDisplayDuration: 500,	 // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
				orientation: "portrait",	 // Android only, optionally lock the orientation to either "portrait" or "landscape"
				openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
			})
		}
	},
	created () {
		console.log('store barcode scanner created')
	}
	}
