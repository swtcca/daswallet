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
	},
	mounted () {
		console.log('mixins cryptoEncDec mounted self test')
		if (this.$store.state.debug) {
			this.crypto_password = '密码'
			this.crypto_content = '内容'
			console.log(`hmacsha1 = ${Crypto.HmacSHA1(this.crypto_content, this.crypto_password)}`)
			this.encrypt()
			console.log(`
				this.crypto_password = '密码'
				this.crypto_content = '内容'
				this.encrypt()
				this.crypto_encrypted = ${this.crypto_encrypted}
			`)
			this.crypto_content = ''
			this.decrypt()
			console.log(`
				this.crypto_content = ''
				this.decrypt()
				this.crypto_content = ${this.crypto_content}
			`)
			console.log(`hmacsha1 = ${Crypto.HmacSHA1(this.crypto_content, this.crypto_password)}`)
			this.crypto_password = null
			this.crypto_content = null
			this.crypto_encrypted = null
		}
	},
}
