<template>
	<div id="productDetail">
		<Header/>
		<div id="productDetailContent" class="bg-light mt-3 p-3">
			<div class="container">
				<div class="row mt-4">
					<div class="col-md-8 px-4">
						<div class="row bg-white">
							<div class="col-12 p-4">
								<div class="row">
									<div class="col-12 proImg">
										<span>
											<img v-bind:src='this.$store.state.apiUrl + "/images/" + product.product_image' v-bind:alt="product.product_name" @click="lightbox(product.product_image)">
										</span>								
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-4 px-4">
						<div class="row bg-white">
							<div class="col-12 p-3">
								<div class="row">
									<h3 class="col">{{product.product_name}}</h3>
									<div class="col"><span class="float-right stock">Stok : <strong>{{product.product_stock}}</strong></span></div>
								</div>
							</div>
							<div class="col-12 p-3 productPrice">
								<span>{{product.product_price | formatPrice}}</span>
							</div>
							<div class="col-12 p-3">
								<div class="row">
									<div class="col-4">
										<select class="col-12 form-control rounded" v-bind:id='"count"+product.product_id' ref="count" v-bind:proid="product.product_id" @click="removeClassError(product.product_id)">
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
									<div class="col-8">
										<button class="btn col-12 btn-dark h-100 d-flex align-items-center justify-content-center" @click="fn_OrderAdd(product)"><i class="icon-cart"></i>Ekle</button>
									</div>
								</div>
							</div>
							<div class="col-12 p-3">
								<div class="row">
									<div class="col-12">
										<h4><span class="px-3 py-2 border-left border-top border-right">İçindekiler</span></h4>
									</div>
									<div class="col-12">
										<p v-html="product.product_contents" class="border-bottom border-left border-right"></p>
									</div>
								</div>
								<div class="row mt-3">
									<div class="col-12">
										<h4><span class="px-3 py-2 border-left border-top border-right">Açıklama</span></h4>
									</div>
									<div class="col-12">
										<p class="border-bottom border-left border-right">{{product.product_description}}</p>
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
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import axios from 'axios'
	import Swal from 'sweetalert2'

	export default{
		name:'Order',
		components:{
			Header,Footer
		},
		props:{

		},
		data(){
			return{
				product:[],
				lightboxShow:false,
				lightboxImg:'',
			}
		},
		methods:{
			lightbox(imgSrc){
				this.lightboxImg = this.$store.state.apiUrl + "/images/"+imgSrc;
				this.lightboxShow = true;
			},
			removeClassError(id){
				document.getElementById('count'+id).classList.remove('error');
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
					axios.post(this.$store.state.apiUrl + '/api/v1/order/add' , {'table_id':this.orderProduct.table_id , 'product_id':product.product_id , 'order_count':count , 'order_price':price , 'order_note':description , 'order_date':date , 'order_user_id':this.orderProduct.order_user_id} , {'headers': {'Authorization':'Bearer ' + token}})
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

							this.getTableDetail();
						};

					}).catch(err => {
						console.log(err);
					});
				}
			},
			getProduct(){
				var id = this.$route.params.id;
				axios.get(this.$store.state.apiUrl + '/api/v1/product/'+id ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.product = response.data.response[0];
					console.log(this.product);
				}).catch(err => {
					console.log(err);
				});	
			}
		},
		created(){
			this.getProduct();			
		}
	}
</script>

<style scoped>
	.productPrice {
	    font-size: 28px;
	    font-weight: 600;
	    color: #000000;
	    line-height: normal;
	}

	.stock
	{
		color: #b7b7b7;
	}
</style>