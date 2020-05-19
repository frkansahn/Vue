<template>
	<div id="account" ref="account">
		<Header/>		
		<div class="container">
			<div class="row mt-lg-5 mt-2">
				<div class="col-lg-10 col-12">
					<!-- <span class="col-12 dropdown" @click="isDropMenu1 = !isDropMenu1">Kullanıcı İşlemleri</span>
					<transition name="fade">
						<div class="col-12 dropcontent" v-if="isDropMenu1">
							<div class="row">											
								<router-link class="col-12 d-block rounded p-1 mb-2" :to="{path:'/cari'}">Ekle</router-link>
								<router-link class="col-12 d-block rounded p-1 mb-2" :to="{path:'/cari'}">Sil</router-link>
								<router-link class="col-12 d-block rounded p-1 mb-2" :to="{path:'/cari'}">Düzenle</router-link>
								<router-link class="col-12 d-block rounded p-1 mb-2" :to="{path:'/user' , component: User , props: { isUserAdd: true }}">Görüntüle</router-link>

							</div>
						</div>
					</transition> -->
					<User v-on:getUser="getUser"/>
				</div>
				<div class="col-lg-2 userInfo pt-2 m-lg-0 m-3 border rounded">
					<div class="row py-4 px-1">
						<div class="col-12 pb-2 mb-2 border-bottom" v-if="userInfo.userImage != '' && userInfo.userImage != null">
							<div class="row">
								<span class="col-12 text-left userImage">
									<img v-bind:src='"http://localhost:4001/images/" + userInfo.userImage'/>
								</span>
							</div>
						</div>
						<div class="col-12 pb-2 mb-2 border-bottom" v-if="userInfo.name">
							<div class="row">
								<span class="col-12 text-left userName">
									<strong> {{userInfo.name}} {{userInfo.surname}}</strong>
								</span>
							</div>
						</div>
						<div class="col-12 pb-2 mb-2 border-bottom" v-if="userInfo.username">
							<div class="row">
								<span class="col-12 text-left">
									{{userInfo.username}}</strong>
								</span>
							</div>
						</div>
						<div class="col-12 pb-2 mb-2 border-bottom" v-if="userInfo.cepNo">
							<div class="row">
								<span class="col-12 text-left cepNo">
									{{userInfo.cepNo}}</strong>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer/>
	</div>	
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import User from '@/components/User'

	import axios from 'axios'

	export default{
		name:'Account',
		components:{
			Header,Footer,User
		},
		data() {
			return {
				userInfo:[]
			}
		},
		methods:{
			getUser(){
				var strUser = '';
				strUser = this.$store.state.user;
				this.userInfo = strUser;
			}
		},
		created(){
			this.getUser();
		}
	}
</script>

<style scoped>
</style>