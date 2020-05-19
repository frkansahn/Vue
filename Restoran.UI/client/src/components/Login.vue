<template>
	<div class="loginBg">
		<div class="login">
			<div class="container">
				<div class="row">
					<div class="col-md-4 col-11 offset-md-7 px-5 pb-4 pt-2 rounded border bg-white">
						<div class="col-12 pt-3 pb-2 px-2">
							<h5 class="text-left mb-0">Üye Girişi</h5>
						</div>
						<div class="col-12 p-2">
							<input type="text" class="col-12 form-control" placeholder="Kullanıcı adınızı giriniz.." name="username" v-model="username">
						</div>
						<div class="col-12 p-2">
							<input type="password" class="col-12 form-control" placeholder="Parolanızı giriniz.." name="password" @keyup.enter="login()" v-model="password">
						</div>
						<div class="col-12 p-2">
							<button class="btn btn-login col-6 mx-auto" @click="login">Giriş</button>
						</div>
						<!-- <router-link :to="{name:'Anasayfa' , params:''}">Anasayfa</router-link> -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import Swal from 'sweetalert2'
	export default {
		name: 'Login',
		props: {
		},
		data(){
			return{
				username:'',
				password:''
			}
		},
		methods:{
			login(){
				axios.post(this.$store.state.apiUrl + '/api/v1/token' , {'username':this.username , 'password':this.password}).then(response => {
					localStorage.setItem('token' , response.data.result.token);
					localStorage.setItem('user' , JSON.stringify(response.data.result.user));
					
					this.$store.commit('newUser' ,response.data.result.user);
					this.$store.commit('newToken' , response.data.result.token);
					this.$router.push('/');
				}).catch(err => {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					Swal.fire(
						'',
						'Hata.',
						'error'
					);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.login
	{
		position: fixed;
		top: 15%;
		right: 0;
		left: 0;
		z-index: 1030;
	}

	.form-control::placeholder
	{
		font-size: 13px;
	}

	.loginBg
	{
		background: url(/images/loginBg.jpg) no-repeat top left;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background-size: cover;
	}

	.btn-login
	{
		background: #ff9800;
		border: 1px solid #ff9800;
		color: #ffffff;
	}

	.btn-login:hover
	{
		background: #f59406;
		border: 1px solid #f59406;
	}
</style>
