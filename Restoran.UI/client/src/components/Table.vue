<template>
	<div id="table">
		<Header/>
		<div class="container" id="masa-detail">
			<div class="row mt-2" v-if="this.tableDetail.length > 0">
				<div class="col-lg-1 col-sm-2 col-4 ml-3 ml-xl-0 border rounded hover btn btn-primary pay p-2" @click="isPay = true"><img src="/images/pay.png" alt="Pay"/>Öde</div>
				<div class="col-lg-2 col-sm-3 col-5 border rounded hover btn btn-success pay p-2 ml-3" @click="isOrderAdd = true , isOrderEdit = false , orderProduct.product_id = '' , orderProduct.order_count = '' , orderProduct.order_note = ''">+ Sipariş Ekle</div>
			</div>
			<div class="row mt-1">
				<div class="col-xl-8 col-12 px-3 pt-3 pb-0 border rounded mt-3 bg-dark" v-if="tableDetail.length > 0">
					<div class="col-12 p-0">
						<span class="col-12 table-name border-bottom">{{table.table_name}}</span>
					</div>
					<table class="table table-responsive-md mb-0 table-dark">
						<thead>
							<tr>
								<th class="no-bg"></th>
								<th>Ürün Görsel</th>
								<th>Ürün Adı</th>
								<th>Adet</th>
								<th>Açıklama</th>
								<th>Birim Fiyat</th>
								<th>Toplam Fiyat</th>
								<th class="no-bg"></th>
							</tr>
							
						</thead>
						<tbody>
							<tr v-for="(detail,index) in tableDetail">
								<td>
									{{index + 1}}
								</td>
								<td @click="lightbox(detail.product_image)">
									<img v-bind:src="`${apiUrl}/images/${detail.product_image}`" v-bind:alt="detail.product_name"/>
								</td>
								<td>
									{{detail.product_name}}
								</td>
								<td class="text-center">
									{{detail.order_count}}
								</td>
								<td class="no-bg">
									{{detail.order_note}}
								</td>
								<td class="text-center">
									{{detail.product_price | formatPrice}}
								</td>
								<td class="text-center">
									{{detail.order_price | formatPrice}}
								</td>
								<td class="no-bg">
									<a class="Delete" title="Siparişi sil" @click="fn_OrderDelete(detail.order_id)">&times;</a>
									<a class="Edit ml-2" title="Siparişi düzenle" @click="orderEditPopup(detail.order_id)"></a>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td colspan="5" class="priceTitle">Toplam</td>
								<td class="priceValue color-white text-center">{{tableTotalPrice | formatPrice}}</td>
								<td></td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div v-else class="col-12 mt-2 mb-5 text-center">
					<span class="no-order-table hvr-wobble-horizontal">Masada Sipariş Bulunmamaktadır..!!</span>
					<div class="col-12 mt-3">
						<div class="col-lg-2 col-sm-4 col-6 border rounded hover btn btn-success pay p-2" @click="isOrderAdd = true">Sipariş Ekle</div>
					</div>
				</div>
				<div class="px-4 mt-3" id="mostPreferred" :class="{'col-xl-4 col-12' : tableDetail.length > 0 , 'col-12' : tableDetail.length == 0}">
					 <div class="row h-100">
					 	 <div class="col-12 border rounded h-100">
					 	 	<div class="row">
					 	 		<div class="col-12 p-2 text-center mt-2">
					 	 			<h5 class="mb-0"><span class="text-danger">En</span><span class="text-dark"> Çok</span><span class="text-warning"> Tercih</span><span class="text-info"> Edilenler</span></h5>
					 	 		</div>
					 	 		<div class="col-12 px-4 my-2">
					 	 			<div class="row">
					 	 				<div class="col-12 px-4">
					 	 					<VueSlickCarousel v-bind="settings" v-if="isSlick">					 	 					
												<div class="px-4" v-for="product in products" v-if="product.product_isPublish == 1">
													<div class="row bg-light">
														<div class="col-12 proImg bg-white">
															<router-link :to="'/productDetail/' + product.product_id">
																<span>
																	<img v-bind:src="`${apiUrl}/images/${product.product_image}`" v-bind:alt="product.product_name" @click="lightbox(product.product_image)">
																</span>
																<span class="productName">{{product.product_name}}</span>	
															</router-link>								
														</div>
														<div class="col-12 pt-1 px-3">
															<span class="price">{{product.product_price | formatPrice}}</span>
														</div>
														<div class="col-12 pt-1 px-3">
															<div class="row">
																<div class="col-4 pr-1">
																	<select class="col-12 form-control btn-sm" v-bind:id='"count"+product.product_id' ref="count" v-bind:proid="product.product_id" @click="removeClassError(product.product_id)">
																		<option value="1" selected>1</option>
																		<option value="2">2</option>
																		<option value="3">3</option>
																		<option value="4">4</option>
																		<option value="5">5</option>
																		<option value="6">6</option>
																		<option value="7">7</option>
																		<option value="8">8</option>
																		<option value="9">9</option>
																		<option value="10">10</option>
																	</select>
																</div>
																<div class="col-8 pl-1">
																	<button class="btn btn-sm col-12 btn-dark d-flex align-items-center justify-content-center" @click="fn_OrderAdd(product)"><i class="icon-cart"></i>Ekle</button>
																</div>
															</div>
														</div>
														<div class="col-12 pt-1 px-3 my-2">
															<div class="row">
																<div class="col-12">
																	<textarea class="form-control" v-bind:id='"description"+product.product_id' placeholder="Sipariş Açıklaması Giriniz.."></textarea>
																</div>
															</div>
														</div>
													</div>
												</div>
						 	 				</VueSlickCarousel>
						 	 			</div>
					 	 			</div>
					 	 		</div>
					 	 	</div>
					 	 </div>
					 </div>
				</div>
			</div>
			<transition name="fade">
				<div class="lightbox" v-if="lightboxShow">
					<img v-bind:src="lightboxImg">
					<div class="overlay" @click="lightboxShow = false">

					</div>
				</div>
			</transition>
			<transition name="fade">
				<div class="popup" v-show="isOrderAdd">
					<div class="popupContent col-11 h-95">
						<div class="row mb-3">
							<div class="col-12 px-4 mt-4">
								<div class="row">
									<div class="float-left p-0 mr-2 btn btn-dark category" ref="category" v-for="(category,index) in categories" :class="{ 'active': index === 0 }" v-bind:id="'category'+category.category_id" @click="fn_selectedCategory(category.category_id)">
										<span class="float-left p-2">{{category.category_name}}</span>
									</div>
								</div>
							</div>
							<div class="col-12">
								<div class="row">
									<div class="col-2 px-4 mt-4" v-for="product in products" v-if="product.category_id == selectedCategory && product.product_isPublish == 1">
										<div class="row border rounded">
											<div class="col-12 proImg">
												<router-link :to="'/productDetail/' + product.product_id">
													<span>
														<img v-bind:src="`${apiUrl}/images/${product.product_image}`" v-bind:alt="product.product_name" @click="lightbox(product.product_image)">
													</span>
													<span class="productName">{{product.product_name}}</span>		
												</router-link>								
											</div>
											<div class="col-12 pt-1 px-2">
												<div class="row">
													<div class="col-4 pr-1">
														<select class="col-12 form-control btn-sm" v-bind:id='"count"+product.product_id' ref="count" v-bind:proid="product.product_id" @click="removeClassError(product.product_id)">
															<option value="1" selected>1</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>
															<option value="6">6</option>
															<option value="7">7</option>
															<option value="8">8</option>
															<option value="9">9</option>
															<option value="10">10</option>
														</select>
													</div>
													<div class="col-8 pl-1">
														<button class="btn btn-sm col-12 btn-dark d-flex align-items-center justify-content-center" @click="fn_OrderAdd(product)"><i class="icon-cart"></i>Ekle</button>
													</div>
												</div>
											</div>
											<div class="col-12 pt-1 px-2 my-2">
												<div class="row">
													<div class="col-12">
														<textarea class="form-control" v-bind:id='"description"+product.product_id' placeholder="Sipariş Açıklaması Giriniz.."></textarea>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="close close-dark" @click="isOrderAdd = false">
								&times;
							</div>	
						</div>
					</div>
					<div class="overlay" @click="isOrderAdd = false">

					</div>	
				</div>
			</transition>

			<transition name="fade">
				<div class="popup" v-show="isOrderEdit">
					<div class="popupContent col-md-5 col-11">
						<div class="row mb-3">
							<div class="col-12 mb-2">
								<span class="proAdd">Sipariş Güncelle</span>
							</div>
							<div class="col-6">
								<div class="row">
									<span class="col-12 text-left required">Ürün</span>
									<div class="col-12">
										<select class="col-12 form-control" ref="product_name" v-model="orderProduct.product_id" @click="$refs.product_name.classList.remove('error')">
											<option value="" disabled="disabled" selected>Ürün Seçiniz</option>
											<option v-for="product in products" v-bind:value="product.product_id" v-if="product.product_isPublish == 1">{{product.product_name}}</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-6">
								<div class="row">
									<span class="col-12 text-left required">Adet</span>
									<div class="col-12">
										<select class="col-12 form-control" ref="product_count" v-model="orderProduct.order_count" @click="$refs.product_count.classList.remove('error')">
											<option value="" disabled="disabled" selected>Adet Seçiniz</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">Sipariş Açıklaması</span>
									<div class="col-12">
										<textarea class="form-control" v-model="orderProduct.order_note" placeholder="Sipariş Açıklaması Giriniz.."></textarea>
									</div>
								</div>
							</div>
							<div class="col-6 pt-4">
								<button name="orderEdit" class="btn btn-info col-12 mt-4" v-if="isOrderEdit" @click="fn_OrderEdit(orderProduct.order_id)">Güncelle</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isOrderEdit = false">

					</div>				
				</div>
			</transition>

			<transition name="fade">
				<div class="popup" v-show="isPay">
					<div class="popupContent">
						<div class="row">
							<div class="col-12 text-center">
								<span class="payPrice">Tutar : <strong>{{tableTotalPrice}}</strong> TL</span>
							</div>
							<div class="col-12 pt-3">
								<div class="row">
									<button type="button" class="btn col-5 m-auto pl-3 pr-3 pt-1 pb-1 orderPay rounded btn-success" @click="fn_OrderPay">Öde</button>
								</div>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isPay = false">

					</div>				
				</div>
			</transition>			
		</div>
		<Footer/>
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import axios from 'axios'
	import Swal from 'sweetalert2'
	import VueSlickCarousel from 'vue-slick-carousel'
	import 'vue-slick-carousel/dist/vue-slick-carousel.css'
	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

	export default{
		name:'Table',
		components:{
			Header,Footer , VueSlickCarousel 
		},
		props:{

		},
		data(){
			return{
				apiUrl: this.$store.state.apiUrl,
				tableDetail: [],
				products:[],
				orderProduct:{
					order_id:'',
					table_id:this.$route.params.id,
					product_id:'',
					order_count:'',
					order_price:'',
					order_note:' ',
					order_date:'',
					order_user_id:JSON.parse(localStorage.getItem('user')).id,
					order_placed:0
				},
				table:[] ,
				categories:[],
				orderEditOrderId:'',
				tableTotalPrice: 0,
				isOrderAdd: false,
				isPay: false,
				isOrderEdit: false,
				lightboxShow:false,
				lightboxImg:'',
				showImg:true,
				selectedCategory:'',
				isSlick:false,
				settings:{
				  dots: false,
				  dotsClass: 'slick-dots custom-dot-class',
				  edgeFriction: 0.35,
				  infinite: true,
				  autoplaySpeed: 2000,
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  initialSlide: 4,
				  autoplay:true,
				  swipeToSlide:true,
				  responsive: [
				    {
				      breakpoint: 1024,
				      settings: {
				        slidesToShow: 3,
				        slidesToScroll: 3,
				        infinite: true,
				        dots: true
				      }
				    },
				    {
				      breakpoint: 600,
				      settings: {
				        slidesToShow: 2,
				        slidesToScroll: 2,
				        initialSlide: 2
				      }
				    },
				    {
				      breakpoint: 480,
				      settings: {
				        slidesToShow: 1,
				        slidesToScroll: 1
				      }
				    }
				  ]
				}
			}
		},
		methods:{
			lightbox(imgSrc){
				this.lightboxImg = this.$store.state.apiUrl + "/images/"+imgSrc;
				this.lightboxShow = true;
			},
			dateFormat:function(){
				var date = new Date();
				var year = date.getFullYear();
				var year = date.getFullYear();
				var mounth = date.getMonth() + 1;
				var day = String(date.getDate());
				if (day.length == 1) {
					day = "0" + day;
				}

				var time = date.toLocaleTimeString();

				var nowDate = year + '-' + mounth + '-' + day + ' ' + time;
				return nowDate ;
			},
			removeClassError(id){
				document.getElementById('count'+id).classList.remove('error');
			},
			fn_selectedCategory(categoryID)
			{
				document.getElementById('category'+this.selectedCategory).classList.remove('active');
				this.selectedCategory = categoryID;
				document.getElementById('category'+categoryID).classList.add('active');
			},
			orderEditPopup(orderId)
			{
				var proId , orderCount, orderNote , orderDate;
				this.tableDetail.map(function(value,key){
					if(value.order_id == orderId)
					{
						proId = value.product_id;
						orderCount = value.order_count;
						orderNote = value.order_note;
					}
				})
				this.orderProduct.product_id = proId;
				this.orderProduct.order_count = orderCount;
				this.orderProduct.order_note = orderNote;
				this.orderProduct.order_date = this.dateFormat();
				this.orderProduct.order_id = orderId;
				this.isOrderEdit = true;
			},
			fn_OrderAdd(product){
				var count = document.getElementById('count'+product.product_id).value;
				var description = document.getElementById('description'+product.product_id).innerHTML;

				if(count == 0 || count == '' || count == 'undefined' || count == null)
				{
					document.getElementById('count'+product.product_id).classList.add('error');
				}

				if(count > 0)
				{
					var token = localStorage.getItem('token');
					var proId = product.product_id;
					var productPrice = product.product_price;
					var price = parseFloat(productPrice)*parseFloat(count);
					var date = this.dateFormat();
					axios.post(this.$store.state.apiUrl + '/api/v1/order/add' , {'table_id':this.orderProduct.table_id , 'product_id':product.product_id , 'order_count':count , 'order_price':price , 'order_note':description , 'order_date':date , 'order_user_id':this.orderProduct.order_user_id , 'order_placed':0} , {'headers': {'Authorization':'Bearer ' + token}})
					.then(response => {
						if(this.table.table_name != '')
						{
							axios.post(this.$store.state.apiUrl + '/api/v1/table/'+this.orderProduct.table_id , {'table_name':this.table.table_name ,'table_status':1 } ,{'headers': { 'Authorization':'Bearer ' + token}})
							.then(response => {								
							}).catch(err => {
								console.log(err);
							});

							Swal.fire(
							'',
							'Sipariş eklendi.',
							'success'
							);
							this.$store.state.cartCount = Number(this.$store.state.cartCount) + 1; 
							
							this.getTableDetail();
						};

					}).catch(err => {
						console.log(err);
					});
				}
			},
			fn_OrderEdit(id){
				var token = localStorage.getItem('token');
				var proId = this.orderProduct.product_id;
				var productPrice = 0;
				this.products.map(function(value,key){
					if(value.product_id == proId)
					{
						productPrice = value.product_price;
					}
				});
				this.orderProduct.order_price = parseFloat(productPrice)*parseFloat(this.orderProduct.order_count);
				axios.post(this.$store.state.apiUrl + '/api/v1/order/'+id , {'table_id':this.orderProduct.table_id , 'product_id':this.orderProduct.product_id , 'order_count':this.orderProduct.order_count , 'order_price':this.orderProduct.order_price , 'order_note':this.orderProduct.order_note , 'order_date':this.orderProduct.order_date , 'order_user_id':this.orderProduct.order_user_id , 'order_placed':this.orderProduct.order_placed} ,{'headers': { 'Authorization':'Bearer ' + token}})
				.then(response => {
					Swal.fire(
						'',
						'Sipariş güncellendi.',
						'info'
						);
					this.isOrderAdd = false;
					this.getTableDetail();

				}).catch(err => {
					console.log(err);
				});
			},
			fn_OrderDelete(orderId){
				var token = localStorage.getItem('token');
				Swal.fire({
					title: 'Emin misin?',
					text: "Siparişi silmek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.get(this.$store.state.apiUrl + '/api/v1/order/delete/'+orderId ,{'headers': { 'Authorization':'Bearer ' + token}})
						.then(response => {
							Swal.fire(
								'',
								'Siparişiniz silindi.',
								'success'
								);
							this.getTableDetail();

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},

			fn_OrderPay(){
				var token = localStorage.getItem('token');
				Swal.fire({
					title: 'Emin misin?',
					text: "Sipariş ödeme işlemini tamamlamak istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) =>{
					if (result.value == true) {
						this.tableDetail.map(function(val,key){
							axios.get(this.$store.state.apiUrl + '/api/v1/order/delete/'+val.order_id ,{'headers': { 'Authorization':'Bearer ' + token}})
							.then(response => {								
							}).catch(err => {
								console.log(err);
							});
						});
						Swal.fire({
							text: "İşleminiz gerçekleştirildi.",
							icon: 'success',
							confirmButtonColor: '#94999c',
							confirmButtonText: 'Tamam'
						}).then((result) => {
							if (result.value){
								axios.post(this.$store.state.apiUrl + '/api/v1/table/'+this.orderProduct.table_id , {'table_name':this.table.table_name ,'table_status':0 } ,{'headers': { 'Authorization':'Bearer ' + token}})
								.then(response => {							
								}).catch(err => {
									console.log(err);
								});
								this.isPay = false;
								this.getTableDetail();
							}
						});						
					}
				});
			},
			getTableDetail(){
				axios.get(this.$store.state.apiUrl + '/api/v1/table/'+this.$route.params.id ,{'headers': { 'Authorization':'Bearer ' +localStorage.getItem('token')}})
				.then(response => {
					this.table = response.data.response[0];
				}).catch(err => {
					console.log(err);
				});
				axios.get(this.$store.state.apiUrl + '/api/v1/category',{'headers':{'Authorization':'Bearer '+localStorage.getItem('token')}})
				.then(response => {
					this.categories = response.data.response;
					this.selectedCategory = response.data.response[0].category_id;
				})
				.catch(err => {
					console.log(err);
				})
				axios.get(this.$store.state.apiUrl + '/api/v1/tableDetail/'+this.$route.params.id ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.tableDetail = response.data.response;
					if(response.data.response.length == 0)
					{
						axios.post(this.$store.state.apiUrl + '/api/v1/table/changeStatus/'+this.orderProduct.table_id , {'table_status':0 } ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {								
						}).catch(err => {
							console.log(err);
						});
						
						this.settings.slidesToShow = 4;
						this.settings.slidesToScroll = 4;
					}
					else
					{
						axios.post(this.$store.state.apiUrl + '/api/v1/table/changeStatus/'+this.orderProduct.table_id , {'table_status':1 } ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {								
						}).catch(err => {
							console.log(err);
						});
					}
					var totalPrice = 0;
					response.data.response.map(function(value,key){
						totalPrice = parseFloat(totalPrice) + parseFloat(value.order_price);
					});
					this.tableTotalPrice = totalPrice;
				}).catch(err => {
					console.log(err);
				});

				axios.get(this.$store.state.apiUrl + '/api/v1/product/' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.products = response.data.response;
					this.isSlick = true;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		created(){
			this.$store.dispatch('isLogin').then(response => {
				this.getTableDetail();
			} , error => {
				if(window.location.hash == "#/"){
					this.$router.push('/');
				}
			})
		},
		watch:{
			tableDetail:function(newValue , oldValue){
				if(newValue.length == 0)
				{
					this.settings.slidesToShow = 4;
					this.settings.slidesToScroll = 4;	
				}
				else
				{
					this.settings.slidesToShow = 1;
					this.settings.slidesToScroll = 1;
				}
			}
		}
	}
</script>

<style scoped>

	.go-home
	{
		color: #000000;
		margin-top: 15px;
		cursor: pointer;
	}

	.table-name
	{
		font-size: 28px;
		font-weight: 600;
		text-align: left;
		float: left;
		padding-left: 0;
		padding-bottom: 10px;
		color: #ffffff;
	}

	.pay img {
	    margin-right: 5px;
	}

	.proAdd {
		font-size: 20px;
		font-weight: 600;
		line-height: normal;
		color: #000000;
		text-transform: uppercase;
		padding-bottom: 20px;
		display: block;
	}

	.payPrice
	{
		font-size: 15px;
		font-weight: normal;
		color: #1c1c1c;
		line-height: normal;
	}

	.payPrice strong
	{
		font-size: 18px;
	}

	div#mostPreferred h5 span {
	    border-top: 1px solid #343a40;
	    border-bottom: 1px solid #343a40;
	    padding: 2px 0;
	}

	div#mostPreferred .border.rounded {
	    border-color: #343a40 !important;
	}

	.no-order-table {
		font-size: 26px;
		color: #000000;
		font-weight: 500;
		line-height: normal;
		text-decoration: underline;
		margin-top: 2em;
		display: block;
		-webkit-animation-duration: 10s;
		animation-duration: 10s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	@-webkit-keyframes hvr-wobble-horizontal {
		16.65% {
			-webkit-transform: translateX(8px);
			transform: translateX(8px);
		}
		33.3% {
			-webkit-transform: translateX(-6px);
			transform: translateX(-6px);
		}
		49.95% {
			-webkit-transform: translateX(4px);
			transform: translateX(4px);
		}
		66.6% {
			-webkit-transform: translateX(-2px);
			transform: translateX(-2px);
		}
		83.25% {
			-webkit-transform: translateX(1px);
			transform: translateX(1px);
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}
	@keyframes hvr-wobble-horizontal {
		16.65% {
			-webkit-transform: translateX(8px);
			transform: translateX(8px);
		}
		33.3% {
			-webkit-transform: translateX(-6px);
			transform: translateX(-6px);
		}
		49.95% {
			-webkit-transform: translateX(4px);
			transform: translateX(4px);
		}
		66.6% {
			-webkit-transform: translateX(-2px);
			transform: translateX(-2px);
		}
		83.25% {
			-webkit-transform: translateX(1px);
			transform: translateX(1px);
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
	}
	.hvr-wobble-horizontal {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px transparent;
	}
	.hvr-wobble-horizontal:hover, .hvr-wobble-horizontal:focus, .hvr-wobble-horizontal:active {
		-webkit-animation-name: hvr-wobble-horizontal;
		animation-name: hvr-wobble-horizontal;
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-timing-function: ease-in-out;
		animation-timing-function: ease-in-out;
		-webkit-animation-iteration-count: 1;
		animation-iteration-count: 1;
	}
</style>