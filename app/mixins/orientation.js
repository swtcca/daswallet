const orientation = require('nativescript-orientation')

export default {
    data () {
      return {
		orientation: orientation
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
		applyOrientation (rotation=false, orientation='portrait', fullscreen=false) {
			this.orientation.setOrientation(orientation)
			if (fullscreen) {
				this.orientation.setFullScreen(fullscreen)
			}
			if (rotation) {
				this.orientation.enableRotation()
			} else {
				this.orientation.disableRotation()
			}
		}
    },
    created () {
      console.log('mixins statusBar created')
    },
    mounted () {
      console.log('mixins statusBar mounted')
    }
  }
