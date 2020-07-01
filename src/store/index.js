import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
=======
import app from './modules/app'
import user from './modules/user'
>>>>>>> 35ff4f7... vue-element-template
import getters from './getters'

Vue.use(Vuex)

<<<<<<< HEAD
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
=======
const store = new Vuex.Store({
  modules: {
    app,
    user
  },
>>>>>>> 35ff4f7... vue-element-template
  getters
})

export default store
