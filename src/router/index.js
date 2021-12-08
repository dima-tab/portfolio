import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Team from '../views/Team.vue'
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/team',
		name: 'Team',
		component: Team
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]
// const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
const router = createRouter({ history: createWebHistory(), routes })
export default router
