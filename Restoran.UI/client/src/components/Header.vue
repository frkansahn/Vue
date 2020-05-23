<template>
	<div class="mt-3" id="header">
		<div class="container">
			<div class="row">
				<div class="col-lg-2 col-sm-4 col-6 pl-xl-0">
					<router-link :to="{path:'/'}" class="col-12 pl-0 float-left">
						<img class="col-9 float-left pl-0" :src="`${imageUrl}/logo.png`">
					</router-link>	
				</div>
				<div class="col-lg-8 d-none d-lg-block my-auto" v-if="isMobile == false">
					<ul class="col-12">
						<li class="float-left">
							<router-link :to="{path:'/siparisler'}">Siparişler</router-link>
						</li>
						<li class="float-left" v-if="this.$store.state.roleStatus == 1">
							<router-link :to="{path:'/cari'}">Cari Hesaplar</router-link>
						</li>
						<li class="float-left" v-if="this.$store.state.roleStatus == 1">
							<router-link :to="{path:'/rapor'}">Raporlar</router-link>
						</li>
						<li class="float-left">
							<router-link :to="{path:'/hesap'}">Hesap</router-link>
						</li>
						<li class="float-left">
							<router-link :to="{path:'/about'}">Hakkında</router-link>
						</li>
						<li class="float-left" v-if="this.$store.state.roleStatus == 0">
							<router-link :to="{path:'/help'}">Yardım</router-link>
						</li>
						<li class="float-left" v-if="this.$store.state.roleStatus == 1">
							<router-link :to="{path:'/setting'}">Ayarlar</router-link>
						</li>
					</ul>					
				</div>
				<div class="col-3 offset-3 d-lg-none d-flex align-items-center" @click="mobileMenu = !mobileMenu">
					<img class="py-4 px-2" :src="`${imageUrl}/menu.png`">
				</div>
				<div class="col-lg-2 pr-0">
					<div @click="goAllOrder('allTableOrder')" class="sepet" :title="`Masalara servis edilmemiş ${this.$store.state.cartCount} adet sipariş bulunmaktadır.`">
						<div class="lds-ripple" v-if="this.$store.state.cartCount > 0"><div></div><div></div></div>
						<i class="icon-cart">
							<span>{{this.$store.state.cartCount}}</span>
						</i>						
					</div>
					<div class="cartDetail d-none d-lg-block">
						<div class="row">
							<div class="col-12">
								
							</div>
						</div>
					</div>
					<span class="username d-none d-lg-block" v-bind:data-username="name">{{name}}</span>
					<span class="exit d-none d-lg-block" @click="signOut">Çıkış Yap</span>
				</div>

				<div class="col-12" v-if="isMobile == true">
					<div class="row">
						<transition name="slide">
							<div class="col-10 mobileMenu" v-show="mobileMenu">
								<div class="row">
									<div class="col-12 menuClose">
										<span>Menü</span>
										<span class="float-right" @click="mobileMenu = false">&times;</span>
									</div>
								</div>
								<div class="row mt-4">
									<div class="col-12 menuLink">
										<ul class="col-12 px-0">
											<li class="col-12">
												<router-link :to="{path:'/siparisler'}">Siparişler</router-link>
											</li>
											<li class="col-12" v-if="this.$store.state.roleStatus == 1">
												<router-link :to="{path:'/cari'}">Cari Hesaplar</router-link>
											</li>
											<li class="col-12" v-if="this.$store.state.roleStatus == 1">
												<router-link :to="{path:'/rapor'}">Raporlar</router-link>
											</li>
											<li class="col-12">
												<router-link :to="{path:'/product'}">Ürün</router-link>
											</li>
											<li class="col-12">
												<router-link :to="{path:'/hesap'}">Hesap</router-link>
											</li>
											<li class="col-12">
												<router-link :to="{path:'/about'}">Hakkında</router-link>
											</li>
											<li class="col-12">
												<router-link :to="{path:'/help'}">Yardım</router-link>
											</li>
											<li class="col-12" v-if="this.$store.state.roleStatus == 1">
												<router-link :to="{path:'/setting'}">Ayarlar</router-link>
											</li>
										</ul>					
									</div>
									<div class="col-12 px-4">
										<span v-bind:data-username="name">{{name}}</span>
										<span class="exit" @click="signOut">Çıkış Yap</span>
									</div>
								</div>
							</div>
						</transition>
						<div class="overlayMenu" @click="mobileMenu = false" v-show="mobileMenu">
							
						</div>
					</div>
				</div>
				<transition name="slide">
					<div class="operationSuccessfull" v-show="operationSuccessfull">
						İşlem başarıyla gerçekleştirildi.
					</div>
				</transition>
				<transition name="fade">
					<div v-show="scroll">
						<div class="backtoTop" @click="fn_toTop()">
						</div>
					</div>
				</transition>		
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import $ from "jquery";
	export default{
		name: 'Header',
		props:{

		},
		data(){
			return{
				name:'',
				isMobile:false,
				mobileMenu:false,
				orders:[],
				scroll: window.scrollY > 150 ? true : false,
				imageUrl:this.$store.state.imageUrl
			}
		},
		props:{
			operationSuccessfull: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			goAllOrder(id){
				if(window.location.pathname == "/")
				{
					$('html,body').animate({
						scrollTop: $("#" + id).offset().top - 10
					}, 'slow');
				}				
			},
			signOut(){
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				this.$store.commit('newRoleStatus' , 0);
				this.$router.push('/login');
			},
			fn_toTop(){
				$('html,body').stop().animate({
					scrollTop: 0
				}, 'slow', 'swing');
			}
		},
		created(){
			document.body.addEventListener('scroll', this.handleScroll);
			axios.get(this.$store.state.apiUrl + '/api/v1/tableDetail/' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
			.then(response => {
				this.orders = response.data.response;
				var cartCount = 0;
				response.data.response.map(function(val,key){
					val.order_placed == 0 ? cartCount = Number(cartCount) + 1 : false; 
				})
				this.$store.commit('newCartCount', cartCount);				
			}).catch(err => {
				console.log(err);
			});
			if(JSON.parse(localStorage.getItem('user')))
			{
				this.$store.commit('newRoleStatus' , JSON.parse(localStorage.getItem('user')).roleStatus);
				this.$store.commit('newUser' , JSON.parse(localStorage.getItem('user')));
			}
			
			this.$store.dispatch('isLogin').then(response => {
				
			} , error => {
				this.$router.push('/login');
			})
			if(localStorage.getItem('user'))
			{
				this.name = JSON.parse(localStorage.getItem('user')).name +' '+  JSON.parse(localStorage.getItem('user')).surname;
			}

			screen.width > 769 ? this.isMobile = false : this.isMobile = true;
		},
		watch:{
		},
		mounted(){
			let _this= this;
			$(window).scroll(
				function (event) {
					if($(window).scrollTop()>150){
						_this.scroll = true;
					}else{
						_this.scroll = false;
					}
				}
				);
		}
	}
</script>
<style scoped>

	#header {
		position: relative;
		height: 105px;
	}

	.mobileMenu {
		position: fixed;
		background: #fd8824;
		top: 0;
		right: 0;
		height: 100%;
		z-index: 99999;
		color:#ffffff;
	}

	#header .mobileMenu ul li {
		padding: 10px;
	}

	.menuLink
	{
		margin-bottom: 20px;
		border-bottom: 2px solid #ffffff;
	}

	.username
	{
		position: absolute;
		left: -10px;
		top: -20px;
		font-size: 12px;
		font-weight: 600;
		line-height: 60px;
		color: #f97300;
		transform: translateY(0px);
		cursor: pointer;
		transition: all .5s ease;
	}

	.mobileMenu .exit {
		color: #000000;
		background: #fd8824;
		position: static;
		padding: 0;
		font-size: 14px;
	}

	.username:before {
		content: attr(data-username);
		position: absolute;
		top: 50px;
	}

	.username:hover {
		transform: translateY(-50px);
		transition: all .3s ease;
	}

	#header:before {
		content: '';
		display: block;
		position: absolute;
		top: 29px;
		left: 0;
		right: 0;
		background: #f97300;
		width: 100%;
		height: 45px;
		z-index: 0;
	}

	#header li
	{
		list-style-type: none;
		padding: 0 20px;
	}

	#header li a
	{
		font-size: 18px;
		color: #ffffff;
	}

	.overlayMenu
	{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000b0;
		z-index: 98;
	}

	.exit {
		font-size: 12px;
		color: #ffffff;
		padding: 5px 10px;
		border-radius: 3px;
		float: right;
		background: #e85454;
		cursor: pointer;
		position: relative;
		top: -7px;
	}

	.exit:hover {
		background: #000000;
	}

	.menuClose {
		font-size: 20px;
		color: #ffffff;
		background: #000000;
		padding: 12px 24px;
	}

	.menuClose span:last-child {
		font-size: 40px;
		line-height: 26px;
		padding: 0;
	}

	@media screen and (max-width: 540px)
	{	
		#header {
			height: 100px;
		}

		#header:before{
			top: 30px;
		}
	}

	@media screen and (max-width: 360px)
	{
		#header {
			height: 80px;
		}

		#header:before{
			top: 15px;
		}
	}
</style>