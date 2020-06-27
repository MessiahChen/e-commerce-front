import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/components/Login')
// const Index = () => import('@/components/index/Index')

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/login',
		name: 'Index',
		component: Login
	}
]

const router = new VueRouter({
	routes
})

export default router
