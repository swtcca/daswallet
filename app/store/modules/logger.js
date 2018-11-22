const state = {
  _toasts: require('nativescript-toasts'),
  _clipboard: require("nativescript-clipboard"),
  _autoToast: false,
  _autoPrompt: false,
}
  
const mutations = {
  setAutoToast: (state, v) => state._autoToast = v,
  setAutoPrompt: (state, v) => state._autoPrompt = v,
}

const getters = {
  toasts: (state) => state._toasts,
  autoPrompt: (state) => state._autoPrompt,
  autoToast: (state) => state._autoToast
}

const actions = {
  showToasts({getters, commit}, message) {
    if (typeof(message) === typeof({})) {
      message = JSON.stringify(message, '', 2)
    }
    getters.toasts.show({
      text: message,
      duration: getters.toasts.DURATION.LONG,
    })
  },
  toClipboard: ({dispatch, getters, commit}, content) => {
    getters.clipboard.setText(content).then(() => { dispatch('showToasts', `${content} copied to clipboard`)})
  },
}
// export this module.
export default {
  state,
  mutations,
  getters,
  actions
}
