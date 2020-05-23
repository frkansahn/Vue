<template>
	<div id="Home" ref="home">
		<Header/>
		<div class="container">
			<div class="row">
				<div class="col-xl-12">
					<div class="row">
						<div class="col-xl-12 linkler mt-3">
							<div class="row">
								<div class="col-lg-4 col-6 p-2 mobil-p-2">
									<router-link class="py-5 btn-success col-12 d-block rounded text-center" :to="{path:'/siparisler'}"><img :src="`${imageUrl}/order.png`" alt="Siparişler">Siparişler</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2" v-if="this.$store.state.roleStatus == 1">
									<router-link class="py-5 btn-primary col-12 d-block rounded text-center" :to="{path:'/cari'}"><img :src="`${imageUrl}/current.png`" alt="Cari">Cari Hesaplar</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2">
									<router-link class="py-5 btn-secondary col-12 d-block rounded text-center" :to="{path:'/hesap'}"><img :src="`${imageUrl}/hesap.png`" alt="Hesap">Hesap</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2" v-if="this.$store.state.roleStatus == 1">
									<router-link class="py-5 btn-default col-12 d-block rounded text-center" :to="{path:'/rapor'}"><img :src="`${imageUrl}/dashboard.png`" alt="Report">Raporlar</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2" v-if="this.$store.state.roleStatus == 1">
									<router-link class="py-5 btn-dark col-12 d-block rounded text-center" :to="{path:'/product'}"><img :src="`${imageUrl}/product.png`" alt="Product">Ürün</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2" v-if="this.$store.state.roleStatus == 1">
									<router-link class="py-5 btn-entegrasyon col-12 d-block rounded text-center" :to="{path:'/integration'}"><img :src="`${imageUrl}/product.png`" alt="Product">Entegrasyon</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2" v-if="this.$store.state.roleStatus == 1">
									<router-link  class="py-5 btn-info col-12 d-block rounded text-center" :to="{path:'/about'}"><img :src="`${imageUrl}/about.png`" alt="About">Hakkında</router-link>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2">									
									<a class="py-5 btn-doviz col-12 d-block rounded text-center" @click="fn_GoExchangeTable()"><img :src="`${imageUrl}/exchange.png`" alt="Exchange">Döviz Tablosu</a>
								</div>

								<div class="col-lg-4 col-6 p-2 mobil-p-2">									
									<router-link class="py-5 btn-warning col-12 d-block rounded text-center" :to="{path:'/help'}"><img :src="`${imageUrl}/help.png`" alt="Help">Yardım</router-link>
								</div>
								
								<div class="col-lg-4 col-6 p-2 mobil-p-2">									
									<a class="py-5 btn-danger col-12 d-block rounded text-center" @click="signOut"><img :src="`${imageUrl}/logout.png`" alt="Logout">Çıkış</a>
								</div>
							</div>
						</div>
						<div class="col-12 mt-4 pr-4" id="allTableOrder">
							<div class="row">
								<div class="col-12 mb-2 lastOrder text-center">
									Tüm Masa Siparişler
								</div>
								<div class="col-12 mt-4 p-0">
									<table class="table table-responsive-md">
										<thead>
											<tr>
												<th class="text-center">Sipariş</th>
												<th class="text-left">Ürün Adı</th>
												<th>Masa</th>
												<th>Adet</th>
												<th>Açıklama</th>
												<th class="text-center">Birim Fiyat</th>
												<th class="text-center">Toplam Fiyat</th>												
											</tr>
											
										</thead>
										<tbody>
											<tr v-for="detail in order">
												<td class="text-center">
													<span class="notPublish" v-if="detail.order_placed == 0" title="Sipariş masaya teslim edilmedi :(" @click="fn_orderDelivery(detail.order_id , 1)">&times;</span>
													<span class="publish" v-else title="Sipariş teslim edildi :)" @click="fn_orderDelivery(detail.order_id , 0)">✓</span>
												</td>
												<td class="text-left">
													{{detail.product_name}}
												</td>
												<td>
													<router-link :to="{path:'/masa/'+detail.table_id}" v-bind:title="detail.table_name">{{detail.table_name}}</router-link>
												</td>
												<td>
													{{detail.order_count}}
												</td>
												<td>
													{{detail.order_note}}
												</td>
												<td class="text-center">
													{{detail.product_price | formatPrice}}
												</td>
												<td class="text-center">
													{{detail.order_price | formatPrice}}
												</td>												
											</tr>
										</tbody>
										<tfoot>
											<tr class="table-secondary">
												<td class="text-left priceTitle" colspan="6">Toplam</td>
												<td class="priceValue text-center">{{allTableTotalPrice | formatPrice}}</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
						<div class="col-12 mt-4 px-4 " v-if="this.$store.state.roleStatus == 1">
							<div class="row">
								<div class="col-12 mb-2 kurBilgileri text-center">
									Kur Bilgileri
								</div>
								<div class="col-12 doviz mt-4 pt-0" v-show="!isLoadingDoviz">						
									<table class="table col-12" v-html="dovizHtml" id="exchangeTable" title="Kur bilgileri YapıKredi bankasının bilgileridir.">

									</table>
								</div>
								<span class="loading loadingDoviz" v-show="isLoadingDoviz"></span>
							</div>
						</div>
					</div>					
				</div>
			</div>
		</div>
		<Footer/>
	</div>	
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import axios from 'axios'
	import Swal from 'sweetalert2'
	import $ from "jquery";

	export default{
		name:'Home',
		components:{
			Header,Footer
		},
		data() {
			return {
				order:[],
				dovizHtml:'',
				allTableTotalPrice:'',
				isLoadingDoviz:true,
				imageUrl:this.$store.state.imageUrl
			}
		},
		methods:{
			signOut(){
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				this.$store.commit('newRoleStatus' , 0);
				this.$router.push('/');
			},
			getExchange(){
				axios.get(this.$store.state.apiUrl + '/api/v1/doviz').then(response => {
					var html = response.data.response;
					this.dovizHtml = $(html).find('#currencyResultContent').html();
					this.isLoadingDoviz = false;
				}).catch(err => {
					console.log(err);
				});
				// axios.get(this.$store.state.apiUrl + '/api/v1/doviz/getTCMB').then(response => {
				// 	console.log(response.data.response['Tarih_Date']['Currency']);
				// }).catch(err => {
				// 	console.log(err);
				// });
				setTimeout(() => {
					this.isLoadingDoviz = true;
					this.getExchange();
				},180000);
			},
			fn_GoExchangeTable(){
				$('html,body').animate({
					scrollTop: $("#exchangeTable").offset().top - 10
				}, 'slow');
			},
			getTableDetail(){
				axios.get(this.$store.state.apiUrl + '/api/v1/tableDetail/' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.order = response.data.response;
					var totalPrice = 0;
					response.data.response.map(function(value,key){
						totalPrice = totalPrice + Number(value.order_price);
					});
					this.allTableTotalPrice = totalPrice;
				}).catch(err => {
					console.log(err);
				});
			},
			fn_orderDelivery(orderId , delivery)
			{
				Swal.fire({
					title: 'Emin misin?',
					text: "Sipariş teslim bilgisini değiştirmek istiyor musunuz ?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.post(this.$store.state.apiUrl + '/api/v1/order/setOrderPlaced/' + orderId ,{'order_placed':delivery} ,{'headers': {'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								var cartCount = Number(this.$store.state.cartCount);
								delivery == 0 ? this.$store.commit('newCartCount', cartCount + 1) : this.$store.commit('newCartCount', cartCount - 1);
								this.getTableDetail();
							}
							else
							{
								response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
								Swal.fire(
									'',
									'İşlem gerçekleştirilemedi.',
									'error'
									);
							}

						}).catch(err => {
							console.log(err);
						});
					}
				});
			}
		},
		created(){
			this.getExchange();
			this.getTableDetail();
		}
	}
</script>

<style scoped>
	.doviz
	{
		padding: 0;
		overflow:auto;
	}

	.doviz table
	{
		background-image: linear-gradient(#3a408a, #6969ea);
		border-radius: 10px;
		padding: 0;
	}

	.kurBilgileri , .lastOrder {
		font-size: 20px;
		font-weight: 600;
		line-height: normal;
		border-bottom: 3px solid #dad4d4;
		padding-bottom: 7px;
		border-radius: 42px;
	}

	.linkler a
	{
		color: #ffffff;
		font-size: 20px;
		cursor: pointer;
	}

	.linkler a:hover {
		-webkit-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.75);
		box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.75);
	}

	.linkler a img {
		margin-right: 10px;
	}

	@media screen and (max-width:540px)
	{
		.linkler a {
			font-size: 18px;
			display: flex !important;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 20px 0 !important;
		}

		.linkler a img {
			margin-right: 0;
			margin-bottom: 5px;
		}
	}
</style>