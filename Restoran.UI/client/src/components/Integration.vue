<template>
	<div id="Integration">
		<Header/>
			<div class="container">
				<div class="row mt-3">
					<h3>Entegrasyon Nedir?</h3>
					<p>E-Ticaret işlemlerinin başında gelen ürün verisi (stok, fiyat, sipariş, kargoya veriliş süresi) otomatik aktarım sistemidir. Sisteme bir kez entegre edildikten sonra veri web service (API) aracılığıyla otomatik olarak güncellenir. Ciddi zaman kazanımı ve kazanç getiren bir sistemdir. Her ölçekte satıcı için kullanışlıdır.</p>
				</div>
				<div class="row mt-3">
					<div class="col-12 px-4 p-lg-3">
						<div class="row mb-3" v-for="(I,index) in integrations">
							<span class="col-12 dropdown" contenteditable v-bind:id="[`IntegrationVisibleName${I.Integrationid}`]" @click="e => e.target.classList.toggle('active')" spellcheck="false">{{I.IntegrationVisibleName}}</span>
		                    <transition name="fade">
		                        <div class="col-12 dropcontent d-none">
		                            <div class="row my-3" v-if="I.IntegrationAppKey != '' && I.IntegrationAppSecret != '' && I.IntegrationAppSecret != null && I.IntegrationAppKey != null">
		                                <div class="col-12 pt-2" v-if="I.IntegrationSupplierid != '' && I.IntegrationSupplierid != null">
		                                	<span>{{I.IntegrationVisibleName}} Satıcı ID : </span>
		                                	<strong>{{I.IntegrationSupplierid}}</strong>
		                                </div>
		                                <div class="col-12 pt-2" v-if="I.IntegrationAppKey != '' && I.IntegrationAppKey != null">
		                                	<span>{{I.IntegrationVisibleName}} App Key : </span>
		                                	<strong>{{I.IntegrationAppKey}}</strong>
		                                </div>
		                                <div class="col-12 pt-2" v-if="I.IntegrationAppSecret != '' && I.IntegrationAppSecret != null">
		                                	<span>{{I.IntegrationVisibleName}} App Secret : </span>
		                                	<strong>{{I.IntegrationAppSecret}}</strong>
		                                </div>
		                                <div class="col-12 pt-2" v-if="I.IntegrationDescription != '' && I.IntegrationDescription != null">
		                                	<span>{{I.IntegrationVisibleName}} Api Açıklama : </span>
		                                	<strong>{{I.IntegrationDescription}}</strong>
		                                </div>		                                
		                                <div class="col-12 pt-2 date" v-if="I.createDate != '' && I.createDate != null">
		                                	<span class="float-left btn btn-dark btn-sm py-1 px-2 mr-1" @click="getOrder(I.IntegrationName)">Siparişleri Getir</span>
		                                	<span class="float-right p-2">Tarih : <strong>{{I.createDate | formatDate}}</strong></span><span class="btn btn-primary btn-sm py-1 px-2 mr-1 float-right" @click="fn_showCreateIntegration(I,true);">Bilgileri Düzenle</span>
		                                </div>
		                            </div>
		                            <div class="row my-3" v-else>
		                            	 <span class="btn btn-info py-2 px-4 mx-auto" @click="fn_showCreateIntegration(I,false)">Entegrasyon Oluştur</span>
		                            </div>
		                            <div class="row">
		                            	<div class="col-12 pt-3" v-if="I.IntegrationNeed != '' && I.IntegrationNeed != null">
		                                	<span @click="fn_getNeed(I.IntegrationNeed)" class="btn btn-sm btn-dark py-1 px-2">Gereklilik</span>
		                                </div>
		                            </div>
		                        </div>
		                    </transition>
		                </div>
		            </div>
				</div>
			</div>
			<transition name="fade">
				<div class="popup" v-show="isIntegrationAdd">
					<div class="popupContent col-lg-5 col-sm-8 col-11">
						<div class="row mb-3">
							<div class="col-12 mb-2">
								<span class="">{{integration.IntegrationVisibleName}}</span>
							</div>
							<div class="col-6">
								<div class="row">
									<span class="col-12 text-left required">Satıcı Numarası</span>
									<div class="col-12">
										<input type="text" name="supplierID" class="form-control" v-model="integration.IntegrationSupplierid">
									</div>
								</div>
							</div>
							<div class="col-6">
								<div class="row">
									<span class="col-12 text-left required">AppKey veya Username</span>
									<div class="col-12">
										<input type="text" name="appkey" class="form-control" v-model="integration.IntegrationAppKey">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left required">AppSecret veya Password</span>
									<div class="col-12">
										<input type="text" name="appsecret" class="form-control" v-model="integration.IntegrationAppSecret">
									</div>
								</div>
							</div>
							<div class="col-6 pt-2">
								<div class="row">
									<span class="col-12 text-left">Açıklama</span>
									<div class="col-12">
										<textarea type="textarea" name="appsecret" class="form-control" v-model="integration.IntegrationDescription">
											
										</textarea>
									</div>
								</div>
							</div>
							<div class="col-6 pt-4">
								<button name="integrationEdit" v-if="isIntegrationEdit == false" class="btn btn-success col-12 mt-4" @click="fn_integrationEdit">Ekle</button>
								<button name="integrationEdit" v-else class="btn btn-info col-12 mt-4" @click="fn_integrationEdit">Güncelle</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isIntegrationAdd = false , isIntegrationEdit = false">

					</div>				
				</div>
			</transition>
			<transition name="fade">
				<div class="popup" v-show="isOrderList">
					<div class="popupContent col-lg-5 col-sm-8 col-11">
						<table class="table table-responsive-md">
							<thead class="thead-dark">
								<tr>
									<th>#</th>
									<th>Sipariş Adı</th>
									<th>Fiyat</th>
									<th>Tarih</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(order,index) in orderList">
									<td>{{index + 1}}</td>
									<td>{{order.orderItemList[0].orderItem[0].productName[0]}}</td>
									<td>{{order.totalAmount[0]}}</td>
									<td>{{order.createDate[0]}}</td>
									<td><a class="btn btn-sm" @click="fn_orderDetail(order.id[0] , order.platform)">Detay</a></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="overlay" @click="isOrderList = false">

					</div>				
				</div>
			</transition>
			<transition name="fade">
				<div class="popupOrderDetail" v-if="isOrderDetail">
					<div class="popupContentOrderDetail popupContent col-lg-8 col-sm-10 col-11">
						<div class="row">
							<div class="col-12 text-center">
								<h3>Sipariş Detayı</h3>
							</div>
							<div class="col-12">
								<span>Müşteri Adı : {{orderDetail[0].billingAddress[0].fullName[0]}}</span>
							</div>
							<div class="col-12">
								 <span>Telefon : {{orderDetail[0].billingAddress[0].gsm[0]}}</span>
							</div>
							<div class="col-12">
								<span>Adres : {{orderDetail[0].billingAddress[0].address[0]}}</span>
							</div>
							<div class="col-12">
								<span>Fiyat : {{orderDetail[0].billingTemplate[0].dueAmount[0]}}</span>
							</div>
							<div class="col-12">
								<span>Ürün : {{orderDetail[0].itemList[0].item[0].productName[0]}}</span>
							</div>
						</div>
					</div>
					<div class="overlayOrderDetail" @click="isOrderDetail = false">

					</div>				
				</div>
			</transition>
			<transition name="fade">
                <div class="popup bg-white" v-show="isNeed">
                    <div class="popupContent col-12">
                        <div class="container">
                            <div class="row py-5">
                                <div class="col-12 border rounded max-h-400 overflow-auto">
                                    <div class="row m-lg-5 m-1">
                                        <div class="col-12 help py-5" v-html="needHtml">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="close" @click="isNeed = false">
                        &times;
                    </div>			
                </div>
            </transition>
		<Footer/>
	</div>
</template>
<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import axios from 'axios'

	export default{
		name:'Help',
		components:{
			Header , Footer
		},
		data(){
			return{
				integrations:[],
				integration:[
				],
				needHtml:'',
				isNeed:false,
				isIntegrationAdd:false,
				isIntegrationEdit:false,
				orderList:[],
				isOrderList:false,
				orderDetail:'',
				isOrderDetail:false
			}
		},
		methods:{
			getOrder(name){
				if(name == 'n11')
				{
					axios.get(this.$store.state.apiUrl + '/api/v1/n11/getAllorder' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
					.then(response => {
						this.orderList = response.data.response['env:Envelope']['env:Body'][0]['ns3:DetailedOrderListResponse'][0]['orderList'][0]['order'];
						this.orderList.map(function(val,key){
							val.platform = 'n11';
						})
						this.isOrderList = true;
						console.log(this.orderList);
					}).catch(err => {
						console.log(err);
					});
				}
			},
			fn_integrationEdit(){

			},
			fn_orderDetail(id , platform){
				if(platform == 'n11')
				{
					axios.get(this.$store.state.apiUrl + '/api/v1/n11/getOrderDetail/'+id ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
					.then(response => {
						this.orderDetail = response.data.response['env:Envelope']['env:Body'][0]['ns3:OrderDetailResponse'][0]['orderDetail'];
						console.log(this.orderDetail);
						this.isOrderDetail = true;
					}).catch(err => {
						console.log(err);
					});
				}
			},
			fn_showCreateIntegration(integrationInfo , edit)
			{
				this.integration = integrationInfo;
				this.isIntegrationAdd = true;
				this.isIntegrationEdit = edit;
			},
			fn_getNeed(val){
				this.needHtml = val;
				this.isNeed = true;
			},
			getStart(){
				axios.get(this.$store.state.apiUrl + '/api/v1/entegrasyon/' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.integrations = response.data.response;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		created(){
			this.getStart();
		}
	}
</script>
<style scoped>
	#Integration .date
	{
		font-size: 12px;
	}
	.max-h-400
	{
		max-height: 400px;
	}

	.close
	{
		position: absolute;
		top: 20px;
		right: 20px;
		width: 30px;
		height: 30px;
		border: 2px solid #e41c1c;
		border-radius: 3px;
		z-index: 99;
		line-height: 28px;
		text-align: center;
		font-size: 33px;
		font-weight: 100;
		color: #e41c1c;
		cursor: pointer;
	}

	.overlayOrderDetail
	{
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #00000047;
	    z-index: 100;
	}

	.popupOrderDetail
	{
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    z-index: 1000;
	}

	.popupContentOrderDetail
	{
		z-index: 101;
	}
</style>