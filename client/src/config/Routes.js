import axios from 'axios';
import Login from '../main/auth/Login'
import SignUp from '../main/auth/SignUp'
import Profile from '../main/profile/Profile'
import config from '../configuration';

export const serverBaseURL = config.serverBaseURL;
axios.defaults.baseURL = serverBaseURL;



export const UnAuthRoutes = [
    {
		path:'/login',
		component: Login
    },
    {
		path:'/signup',
		component: SignUp
	},
]

export const AuthRoutes = [
    {
		path:'/',
		component: Profile
    },
]