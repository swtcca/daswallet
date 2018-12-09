import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert"

export default {
    data () {
      return {
          tnsFaAlert: TNSFancyAlert,
          tnsFaButton: TNSFancyAlertButton
      }
    },
    computed: {
    },
    watch: {

    },
    methods: {
    },
    created () {
      console.log('mixins fancy alert created')
    },
    mounted () {
      console.log('mixins fancy alert mounted')
    }
  }