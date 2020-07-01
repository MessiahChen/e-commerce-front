import Vue from 'vue'
<<<<<<< HEAD
import SvgIcon from '@/components/SvgIcon'// svg component
=======
import SvgIcon from '@/components/SvgIcon' // svg组件
>>>>>>> 35ff4f7... vue-element-template

// register globally
Vue.component('svg-icon', SvgIcon)

<<<<<<< HEAD
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
=======
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
>>>>>>> 35ff4f7... vue-element-template
requireAll(req)
