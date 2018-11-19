//require('nativescript-nodeify/nodeify')
const Crypto = require("crypto-js")
//
export default {
	data () {
		return {
			crypto_password: null,
			crypto_encrypted: null,
			crypto_content: null,
		}
	},
	methods: {
		encrypt () {
			try {
				this.crypto_encrypted = Crypto.AES.encrypt(this.crypto_content, this.crypto_password).toString()
			} catch (exception) {
				console.log(exception)
				throw new Error(exception.message)
			}
		},
		decrypt() {
			try {
				this.crypto_content = Crypto.AES.decrypt(this.crypto_encrypted.toString(), this.crypto_password).toString(Crypto.enc.Utf8)
			} catch (exception) {
				console.log(exception)
				throw new Error(exception.message);
			}
		}
	},
	created () {
		console.log('mixins cryptoEncDec created')
	}
}
