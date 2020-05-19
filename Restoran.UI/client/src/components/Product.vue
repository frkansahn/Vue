<template>
	<div id="Product" ref="product_description">
		<Header :operationSuccessfull="isOperationSuccessfull"/>
		<div class="container">
			<div class="row mt-3">
				<div class="float-left p-lg-0 p-1">
					<button type="button" class="btn btn-small btn-success col" @click="isProductAdd = true , isProductEdit = false , icindekiler = '' , productAdd.product_name = '' , productAdd.category_id = '' , productAdd.product_price = '', productAdd.product_stock = '' , productAdd.product_description = '', productAdd.product_contents = '' , showImg = true">+ Ürün Ekle</button>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-12 p-lg-0 p-1">
					<table class="table table-responsive-md">
						<thead class="thead-dark">
							<tr>
								<th scope="col"></th>
								<th scope="col">Resim</th>
								<th scope="col">Ürün Adı</th>
								<th scope="col">Kategori</th>
								<th scope="col">Fiyat</th>
								<th scope="col">Stok</th>								
								<th scope="col">Yayın Durumu</th>
								<th scope="col">Oluşturma Tarihi</th>
								<th scope="col">Açıklama</th>								
								<th scope="col"></th>								
							</tr>
							
						</thead>
						<tbody>
							<tr v-for="(P,index) in products">
								<td scope="row">
									{{index + 1}}
								</td>
								<td  scope="row" @click="lightbox(P.product_image)">
									<img v-if="P.product_image" v-bind:src="`${apiUrl}/images/${P.product_image}`" v-bind:alt="P.product_name"/>
								</td>
								<td scope="row">
									<router-link :to="'/productDetail/' + P.product_id">
										{{P.product_name}}
									</router-link>
								</td>
								<td scope="row">
									{{P.category_name}}
								</td>
								<td scope="row">
									{{P.product_price}}
								</td>
								<td scope="row">
									{{P.product_stock}}
								</td>								
								<td class="text-center">
									<span class="publish" v-if="P.product_isPublish == 1" @click="fn_notPublish(P.product_id)">✓</span>
									<span class="notPublish" v-else @click="fn_Publish(P.product_id)">&times;</span>
								</td>
								<td scope="row">
									{{P.product_creation_time | formatDate}}
								</td>
								<td scope="row">
									{{P.product_description}}
								</td>							
								<td scope="row" class="">
									<div class="d-flex">
										<a class="Delete" @click="fn_productDelete(P.id)">&times;</a>
										<a class="Edit ml-2" @click="productEditPopup(P)"></a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
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
				<div class="popup" v-show="isProductEdit">
					<div class="popupContent col-11 col-lg-5">
						<div class="row" id="productAdd">
							<div class="col-12 mb-2">
								<span class="productAdd">Ürün Ekle</span>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required">İsim</span>
									<div class="col-12">
										<input type="text" name="name" ref="product_name" class="form-control col" v-model="product.product_name" required="required" @click="$refs.product_name.classList.remove('error')">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required  pl-0">Kategori</span>
									<div class="col-12 pl-0">
										<select class="form-control" ref="category_id" v-model="product.category_id" @click="$refs.category_id.classList.remove('error')">
											<option value="" disabled="disabled" selected="selected">
												Kategori Seçiniz
											</option>
											<option v-for=" category in categories" v-bind:value="category.category_id">{{category.category_name}}</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required">Fiyat</span>
									<div class="col-12">
										<input type="number" name="name" ref="product_price" class="form-control col" @input="handleInput" v-model="product.product_price" required="required" @click="$refs.product_price.classList.remove('error')">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left pl-0">Stok</span>
									<div class="col-12 pl-0">
										<input type="number" name="name" class="form-control col" @input="handleInput" v-model="product.product_stock" required="required">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">Resim</span>
									<div class="col-12">
										<label v-if="showImg">
									    	<input type="file" id="file" ref="file" v-on:change="imageUpload()"/>
									    </label>
									    <span class="position-relative float-left" v-else>
									    	<img v-bind:src="`${apiUrl}/images/${product.product_image}`">
									    	<span class="imgDelete" @click="fn_imgDelete">&times;</span>
									    </span>
									</div>
								</div>
							</div>
							
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left pl-0">Açıklama</span>
									<div class="col-12 pl-0">
										<textarea class="form-control" name="productDescription" v-model="product.product_description" placeholder="Ürün Açıklaması Giriniz.."></textarea>
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">İçindekiler</span>
									<div class="col-12 pt-2">
										<button class="btn btn-dark" @click="isContents = true">İçeriği geliştir editörde düzenlemek için tıklayınız.</button>
									</div>
								</div>
							</div>
							<div class="col-6 d-flex align-items-end">
								<button type="submit" name="prodcutEdit" class="btn btn-info col-12" v-if="isProductEdit" @click="fn_productEdit">Güncelle</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isProductEdit = false , getProduct">

					</div>				
				</div>
			</transition>
			</transition>
			<transition name="fade">
				<div class="popup" v-show="isProductAdd">
					<div class="popupContent col-11 col-lg-5">
						<div class="row" id="productAdd">
							<div class="col-12 mb-2">
								<span class="productAdd">Ürün Ekle</span>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required">İsim</span>
									<div class="col-12">
										<input type="text" name="name" ref="product_name" class="form-control col" v-model="productAdd.product_name" required="required" @click="$refs.product_name.classList.remove('error')">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required  pl-0">Kategori</span>
									<div class="col-12 pl-0">
										<select class="form-control" ref="category_id" v-model="productAdd.category_id" @click="$refs.category_id.classList.remove('error')">
											<option value="" disabled="disabled" selected="selected">
												Kategori Seçiniz
											</option>
											<option v-for=" category in categories" v-bind:value="category.category_id">{{category.category_name}}</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required">Fiyat</span>
									<div class="col-12">
										<input type="number" name="name" ref="product_price" class="form-control col" @input="handleInput" v-model="productAdd.product_price" required="required" @click="$refs.product_price.classList.remove('error')">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left pl-0">Stok</span>
									<div class="col-12 pl-0">
										<input type="number" name="name" class="form-control col" @input="handleInput" v-model="productAdd.product_stock" required="required">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">Resim</span>
									<div class="col-12">
										<label v-if="showImg">
									    	<input type="file" id="file" ref="file" v-on:change="imageUpload()"/>
									    </label>
									    <span class="position-relative float-left" v-else>
									    	<img v-bind:src="`${apiUrl}/images/${productAdd.product_image}`">
									    	<span class="imgDelete" @click="fn_imgDelete">&times;</span>
									    </span>
									</div>
								</div>
							</div>
							
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left pl-0">Açıklama</span>
									<div class="col-12 pl-0">
										<textarea class="form-control" name="productDescription" v-model="productAdd.product_description" placeholder="Ürün Açıklaması Giriniz.."></textarea>
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">İçindekiler</span>
									<div class="col-12 pt-2">
										<button class="btn btn-dark" @click="isContents = true">İçeriği geliştir editörde düzenlemek için tıklayınız.</button>
									</div>
								</div>
							</div>
							<div class="col-6 d-flex align-items-end">
								<button type="submit" name="productAdd" class="btn btn-success col-12" v-if="!isProductEdit" @click="fn_productAdd">Ürünü Ekle</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isProductAdd = false , getProduct">

					</div>				
				</div>
			</transition>
			<transition name="fade">
				<div class="popup" v-show="isContents">
					<div class="popupContent col-11">
						<div class="row">
							<div class="col-10 offset-ml-1 offset-mr-1">
								<editor
                                   api-key="6o9ewvq6bt1zsdfx45k1wym6rdyfmhe5xb2dczqj7sapvqtt"
                                   cloud-channel="5"
                                   :init="{
                                        selector: 'textarea',
                                        height: 500,
                                        menubar: true,
                                        language:'tr',
                                        entity_encoding : 'raw',
                                        plugins: [
                                        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                                        'insertdatetime media nonbreaking save table contextmenu directionality',
                                        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
                                        ],
                                        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                                        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
                                        images_upload_handler: function (blobInfo, success, failure) {
                                            imageUpload(blobInfo);
                                        },
                                        external_filemanager_path: '/filemanager/',
                                        filemanager_title: 'Media Gallery',
                                        external_plugins: { 'filemanager':'/filemanager/plugin.min.js' }
                                    }"

                                   v-model="icindekiler"
                                />
							</div>
						</div>
						<div class="row">
							<div class="col-12 pt-2">
								<button class="btn btn-sm btn-dark mr-2" @click="isContents = false">İptal</button>
								<button class="btn btn-sm btn-success" @click="fn_contentsSave()">Kaydet</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isContents = false">

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
	import Editor from '@tinymce/tinymce-vue'

	export default{
		name:'Product',
		components:{
			Header , Footer , 'editor': Editor
		},
		data() {
			return {
				products:[],
				product:{
					product_id:'',
					category_id:'',
					product_name:'',
					product_price:0,
					product_image:'',
					product_description:'',
					product_contents:'',
					product_stock:0,
					product_creation_time:'',
					product_isPublish:''
				},
				productAdd:{
					product_id:'',
					category_id:'',
					product_name:'',
					product_price:0,
					product_image:'',
					product_description:'',
					product_contents:'',
					product_stock:0,
					product_creation_time:'',
					product_isPublish:''
				},
				categories:[],
				isProductAdd:false,
				isProductEdit:false,
				lightboxShow:false,
				isContents:false,
				isOperationSuccessfull:false,
				lightboxImg:'',
				icindekiler:'',
				showImg:true,
				apiUrl: this.$store.state.apiUrl
			}
		},
		methods:{
			nowDate:function(){
				var date = new Date();
				var year = date.getFullYear();
				var year = date.getFullYear();
				var mounth = String(date.getMonth() + 1);
				var day = String(date.getDate());
				if (day.length == 1) {
					day = "0" + day;
				}
				if (mounth.length == 1) {
					mounth = "0" + mounth;
				}

				var time = date.toLocaleTimeString();

				var nowDate = year + '-' + mounth + '-' + day + ' ' + time;
				return nowDate ;
			},
			fn_contentsSave(){
				this.product.product_contents = this.icindekiler; 
				this.productAdd.product_contents = this.icindekiler; 
				this.isContents = false; 
				this.isOperationSuccessfull = true;
				setTimeout(()=>{
				  this.isOperationSuccessfull = false;
				},2000);
			},
			fn_imgDelete()
			{
				console.log(this.product.product_image);
				var url = this.$store.state.apiUrl + '/api/v1/product/images/delete/'+this.product.product_image;
				Swal.fire({
					title: 'Emin misin?',
					text: "Resmi silmek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.get(url ,{'headers': {'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								this.product.product_image = '';
								this.showImg = true;
								var productInfo = {'category_id':this.product.category_id , 'product_name':this.product.product_name , 'product_price':this.product.product_price , 'product_image':this.product.product_image, 'product_description':this.product.product_description , 'product_stock':this.product.product_stock , 'product_isPublish':this.product.product_isPublish};
								axios.post(this.$store.state.apiUrl + '/api/v1/product/' + this.product.product_id, productInfo ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
								.then(response => {
									console.log(response);

								}).catch(err => {
									console.log(err);
								});
							}
							else
							{
								response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
								Swal.fire(
									'',
									'Resim silme işlemi gerçekleştirilemedi.',
									'error'
								);
							}

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},
			fn_notPublish(id)
			{
				Swal.fire({
					title: 'Emin misin?',
					text: "Ürünü yayına kapatmak istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.post(this.$store.state.apiUrl + '/api/v1/product/publish/'+id, {publish:'0'} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								Swal.fire(
									'',
									'Ürün yayından kaldırıldı.',
									'success'
									);
								this.getProduct();
							}
							else
							{
								response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
								Swal.fire(
									'',
									'Ürünü yayından kaldırma işlemi gerçekleştirilemedi.',
									'error'
									);
							}

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},
			fn_Publish(id){
				Swal.fire({
					title: 'Emin misin?',
					text: "Ürünü yayına kapatmak istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.post(this.$store.state.apiUrl + '/api/v1/product/publish/'+id, {publish:'1'} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								Swal.fire(
									'',
									'Ürün yayına alındı.',
									'success'
									);
								this.getProduct();
							}
							else
							{
								response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
								Swal.fire(
									'',
									'Ürünü yayına alma işlemi gerçekleştirilemedi.',
									'error'
									);
							}

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},
			imageUpload(){
				this.file = this.$refs.file.files[0];
				let formData = new FormData();
	            formData.append('file', this.file);
	  
	            this.axios.post(this.$store.state.apiUrl + '/api/v1/image/upload',
	                formData,
	                {
	                headers: {
	                    'Content-Type': 'multipart/form-data'
	                }
	              }
	            ).then(response => {
	              console.log(response.data);
	              this.product.product_image = response.data.response.filename;
	              this.productAdd.product_image = response.data.response.filename;
	              this.showImg = false;
	            })
	            .catch(function(){
	              console.log('FAILURE!!');
	            });
			},
			handleInput (e) {
		      let stringValue = e.target.value.toString()
		      let regex = /^\d*(\.\d{1,2})?$/
		      if(!stringValue.match(regex) && this.price!== '') {
		        this.price = this.previousPrice
		      }
		      this.previousPrice = this.price
		    },
			lightbox(imgSrc){
				this.lightboxImg = this.$store.state.apiUrl + "/images/"+imgSrc;
				this.lightboxShow = true;
			},
			getProduct(){
				axios.get(this.$store.state.apiUrl + '/api/v1/product',{'headers':{'Authorization':'Bearer '+localStorage.getItem('token')}})
				.then(response => {
					this.products = response.data.response;
				})
				.catch(err => {
					console.log(err);
				});

				axios.get(this.$store.state.apiUrl + '/api/v1/category',{'headers':{'Authorization':'Bearer '+localStorage.getItem('token')}})
				.then(response => {
					this.categories = response.data.response;
				})
				.catch(err => {
					console.log(err);
				})
			},
			fn_productAdd(){
				if(this.productAdd.category_id == '')
				{
					var tag = this.$refs.category_id;
					tag.classList.add("error");
				}

				if(this.productAdd.product_name == '')
				{
					var tag = this.$refs.product_name;
					tag.classList.add("error");
				}

				if(this.productAdd.product_price == '0' || this.productAdd.product_price == '')
				{
					var tag = this.$refs.product_price;
					tag.classList.add("error");
				}

				if(this.productAdd.category_id != '' && this.productAdd.product_name != '' && this.productAdd.product_price != '0' && this.productAdd.product_price != '')
				{
					var nowDate = this.nowDate() || ' ';
					this.product.product_creation_time = nowDate;
					var productInfo = {'category_id':this.productAdd.category_id , 'product_name':this.productAdd.product_name , 'product_price':this.productAdd.product_price , 'product_image':this.productAdd.product_image, 'product_description':this.productAdd.product_description ,'product_contents':this.productAdd.product_contents, 'product_stock':this.productAdd.product_stock , 'product_creation_time':this.productAdd.product_creation_time};
					Swal.fire({
						title: 'Emin misin?',
						text: "Ürünü eklemek istiyor musunuz?",
						icon: 'question',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Evet',
						cancelButtonText: 'Hayır'
					}).then((result) => {
						if (result.value == true) {
							axios.post(this.$store.state.apiUrl + '/api/v1/product/add/', productInfo ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
							.then(response => {
								if(!response.data.error)
								{
									Swal.fire(
										'',
										'Ürün eklendi.',
										'success'
										);
									this.isProductAdd = false;
									this.showImg = true;
									this.getProduct();
									this.productAdd.category_id = '';
									this.productAdd.product_name = '';
									this.productAdd.product_price = 0;
									this.productAdd.product_image = '';
									this.productAdd.product_description = '';
									this.productAdd.product_stock = 0;
									this.icindekiler = '';
								}
								else
								{
									response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
									Swal.fire(
										'',
										'Ürün eklenemedi.',
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
			fn_productEdit()
			{
				var productInfo = {'category_id':this.product.category_id , 'product_name':this.product.product_name , 'product_price':this.product.product_price , 'product_image':this.product.product_image, 'product_description':this.product.product_description , 'product_contents':this.product.product_contents , 'product_stock':this.product.product_stock , 'product_isPublish':this.product.product_isPublish};
				axios.post(this.$store.state.apiUrl + '/api/v1/product/' + this.product.product_id, productInfo ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					if(!response.data.error)
					{
						Swal.fire(
							'',
							'Ürün güncellendi.',
							'success'
							);
						this.isProductAdd = false;
						this.showImg = true;
						this.getProduct();
						this.product.category_id = '';
						this.product.product_name = '';
						this.product.product_price = 0;
						this.product.product_image = '';
						this.product.product_description = '';
						this.product.product_stock = 0;
					}
					else
					{
						response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
						Swal.fire(
							'',
							'Kullanıcı eklenemedi.',
							'error'
							);
					}

				}).catch(err => {
					console.log(err);
				});
			},
			fn_productDelete(proId)
			{
				var token = localStorage.getItem('token');
				Swal.fire({
					title: 'Emin misin?',
					text: "Ürünü silmek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.get(this.$store.state.apiUrl + '/api/v1/product/delete/'+proId ,{'headers': { 'Authorization':'Bearer ' + token}})
						.then(response => {
							Swal.fire(
								'',
								'Ürün silindi.',
								'success'
								);
							this.getProduct();

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},
			productEditPopup(productEditInfo)
			{
				this.isProductEdit = true;
				this.product = productEditInfo;
				this.icindekiler = productEditInfo.product_contents;
				productEditInfo.product_image != '' ? this.showImg = false : this.showImg = true;
			}
		},
		created(){
			this.getProduct();
		}
	}
</script>

<style scoped>

	textarea[name=productDescription] {
	  	resize: none;
	  	min-height: 80px;
	}
</style>