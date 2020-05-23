import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: '',
		user:'',
		isLogin:false,
		roleStatus: '',
		operationSuccessfull:false,
		cartCount:0,
		apiUrl:'https://furkan.t-soft.club:44001',
		imageUrl:'/images'
	},
	mutations: {
		newRoleStatus(state , newStatus)
		{
			state.roleStatus = newStatus;
		},
		newUser(state , newUser)
		{
			state.user = newUser;
		},
		newToken(state, newToken)
		{
			state.token = newToken;
		},
		newOperationSuccessfull(state , newOperationSuccessfull)
		{
			state.operationSuccessfull = newOperationSuccessfull
		},
		newCartCount(state, newCartCount)
		{
			state.cartCount = newCartCount;
		}
	},
	getters:{
		
	},
	actions:{
		isLogin(state){
			return new Promise((resolve, reject) => {
	            if(localStorage.getItem('token') == null || localStorage.getItem('token') == '' || localStorage.getItem('token') == false || localStorage.getItem('token') == 'undefined') 
				{					
					reject(true);
				}
				else
				{
					resolve(false);
				}
	        })
		}
	}
})