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
		encrypt (message, password) {
			return Crypto.AES.encrypt(message, password).toString()
		},
		decrypt(encrypted, password) {
			return Crypto.AES.decrypt(encrypted.toString(), password).toString(Crypto.enc.Utf8)
		},
		hash_sha256(message) {
			return Crypto.SHA256(message).toString()
		}
	},
	created () {
		console.log('mixins cryptoEncDec created')
	},
	mounted () {
		console.log('mixins cryptoEncDec mounted self test')
	//	if (this.$store.state.debug) {
	//		this.crypto_password = '密码'
	//		this.crypto_content = '内容'
	//		console.log(`hmacsha1 = ${Crypto.HmacSHA1(this.crypto_content, this.crypto_password)}`)
	//		console.log(this.hash_sha256('123'))
	//		console.log(this.hash_sha256(this.crypto_password))
	//		this.crypto_encrypted = this.encrypt(this.crypto_content, this.crypto_password)
	//		console.log(`
	//			this.crypto_password = ${this.crypto_password}
	//			this.crypto_content = ${this.crypto_content}
	//			this.crypto_encrypted = this.encrypt(this.crypto_content, this.crypto_password)
	//			this.crypto_encrypted = ${this.crypto_encrypted}
	//		`)
	//		this.crypto_content = ''
	//		this.crypto_content = this.decrypt(this.crypto_encrypted, this.crypto_password)
	//		console.log(`
	//			this.crypto_content = ''
	//			this.crypto_content = this.decrypt(this.crypto_encrypted, this.crypto_password)
	//			this.crypto_content = ${this.crypto_content}
	//		`)
	//		console.log(`hmacsha1 = ${Crypto.HmacSHA1(this.crypto_content, this.crypto_password)}`)
	//		console.log(this.hash_sha256('123'))
	//		console.log(this.hash_sha256(this.crypto_password))
	//		this.crypto_password = null
	//		this.crypto_content = null
	//		this.crypto_encrypted = null
	//	}
	},
}
