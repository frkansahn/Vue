<template>
	<div id="report">
		<Header/>
		<div class="container" id="rapor">
			<div class="row mt-3">
				<div class="col-lg-10">
					<div class="row">
						<div class="col px-4">
							<div class="row">
								<div class="col-12 border-bottom mb-2 pl-0">
									<span class="float-left">Masa</span>
								</div>
								<select class="form-control" v-model="selectTable">
									<option value="" selected="selected" disabled="disabled">Masa Seçiniz</option>
									<option v-for="table in tables" v-bind:value="table.table_id">{{table.table_name}}</option>
									<option v-bind:value="0">Tümünü Göster</option>
								</select>
							</div>
						</div>
						<div class="col px-4">
							<div class="row">
								<div class="col-12 border-bottom mb-2 pl-0">
									<span class="float-left">Ürün</span>
								</div>
								<select class="form-control" v-model="selectProduct">
									<option value="" selected="selected" disabled="disabled">Ürün Seçiniz</option>
									<option v-for="product in products" v-bind:value="product.product_id">{{product.product_name}}</option>
									<option v-bind:value="0">Tümünü Göster</option>
								</select>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="row">
								<div class="col-6 px-4">
									<div class="row">
										<div class="col-12 border-bottom mb-2 pl-0">
											<span class="float-left">Başlangıç</span>
										</div>
										<div class="col-12 p-0 position-relative">
											<datetime max-datetime="datetimeEnd" input-id="datetimeStart" input-class="datetime" type="datetime" v-model="datetimeStart" value-zone="UTC+3"></datetime>
											<span class="emptyDate" @click="datetimeStart = ''" v-if="datetimeStart != ''">&times;</span>
										</div>
									</div>
								</div>
								<div class="col-6 px-4">
									<div class="row">
										<div class="col-12 border-bottom mb-2 pl-0">
											<span class="float-left">Bitiş</span>
										</div>
										<div class="col-12 p-0 position-relative">
											<datetime min-datetime="datetimeStart" input-id="datetimeEnd" input-class="datetime" type="datetime" value-zone="UTC+3" v-model="datetimeEnd"></datetime>
											<span class="emptyDate" @click="datetimeEnd = ''" v-if="datetimeEnd != ''">&times;</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-2 mt-lg-0 mt-3 d-flex align-items-end">
					<div class="row">
						<span class="col gosterim">Gösterim </span>
						<select class="form-control col" v-model="perPage" @change="setPages">
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row mt-3">				
				<table class="table table-responsive-md" id="printTable">
					<thead>
						<tr>
							<th>Masa Adı</th>
							<th>Ürün Adı</th>
							<th>Sipariş Adet</th>
							<th>Sipariş Tutarı</th>
							<th>Sipariş Notu</th>
							<th>Tarih</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="order in displayedOrders">
							<td>{{order.table_name}}</td>
							<td>{{order.product_name}}</td>
							<td>{{order.order_log_count}}</td>
							<td>{{order.order_log_price | formatPrice}}</td>
							<td>{{order.order_log_note}}</td>
							<td>{{order.dateTime | formatDate}}</td>
						</tr>
					</tbody>
				</table>
				<div class="col-12 p-lg-0 p-3 mt-4">
					<nav aria-label="Page navigation example">
						<div class="row">
							<ul class="pagination col-12 col-lg-10">
								<li class="page-item mr-2">
									<button type="button" class="page-link" @click="page = 1"> İlk </button>
								</li>
								<li class="page-item">
									<button type="button" class="page-link" v-if="page != 1" @click="page--"> Geri </button>
								</li>
								<li class="page-item d-flex mx-2">
									<button type="button" class="page-link mx-2" v-for="pageNumber in pages.slice(page-1, page+7)" @click="page = pageNumber" v-if="isMobile == false"> {{pageNumber}} </button>
									<button type="button" class="page-link mx-2" v-for="pageNumber in pages.slice(page-1, page+3)" @click="page = pageNumber" v-if="isMobile == true"> {{pageNumber}} </button>
								</li>
								<li class="page-item">
									<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> İleri </button>
								</li>
								<li class="page-item ml-2">
									<button type="button" class="page-link" @click="page = pages.length"> Son </button>
								</li>
							</ul>
							<div class="col-12 col-lg-2">
								<button class="btn btn-success float-right" type="button" @click="excelOrder">Excel</button>
								<button class="btn btn-primary float-right mr-2" type="button" @click="printOrder">Yazdır</button>
							</div>
						</div>
						<div class="col-12 mt-4 text-center">
							<span class="fromTo">{{FromTo}}</span>
						</div>

						<div class="col-12 mt-2 text-center">
							<span class="fromTo">{{orderLenght}} adet sipariş bulunmaktadır.</span>
						</div>
					</nav>
				</div>	
			</div>

			<div class="col-12 d-none">
				<div class="row">
					<div class="col-12" ref="printTable">
						<table class="table" ref="downloadTable" id="downloadTable">
							<thead>
								<tr>
									<th>Masa Adı</th>
									<th>Ürün Adı</th>
									<th>Sipariş Adet</th>
									<th>Sipariş Tutarı</th>
									<th>Sipariş Notu</th>
									<th>Tarih</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="order in orders">
									<td>{{order.table_name}}</td>
									<td>{{order.product_name}}</td>
									<td>{{order.order_log_count}}</td>
									<td>{{order.order_log_price | formatPrice}}</td>
									<td>{{order.order_log_note}}</td>
									<td>{{order.dateTime | formatDate}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	import axios from 'axios'
	import { Datetime } from 'vue-datetime';
	import 'vue-datetime/dist/vue-datetime.css'

	export default{
		name:'Report',
		components:{
			Header,Footer , Datetime
		},
		props:{

		},
		data(){
			return{
				datetimeStart:'',
				datetimeEnd:'',
				orders:[],
				reportOrders:[],
				tables:[],
				products:[],
				page: 1,
				perPage: 10,
				pages: [],
				FromTo:'',
				orderLenght:'',
				selectTable:'',
				selectProduct:'',
				isMobile:false
			}
		},
		methods:{
			fn_datetimeStart(){
				console.log('Başlangıç : ' + this.datetimeStart);
				console.log('Bitiş : ' + this.datetimeEnd);
			},
			getReport(){
				axios.get(this.$store.state.apiUrl + '/api/v1/report' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.orders = response.data.response;
					this.orderLenght = response.data.response.length;
					this.reportOrders = response.data.response;	
				}).catch(err => {
					console.log(err);
				});
			},
			getTable(){
				axios.get(this.$store.state.apiUrl + '/api/v1/table/' ,{'headers': { 'Authorization':'Bearer ' +localStorage.getItem('token')}})
				.then(response => {
					this.tables = response.data.response;
				}).catch(err => {
					console.log(err);
				});
			},
			getProduct(){
				axios.get(this.$store.state.apiUrl + '/api/v1/product/' ,{'headers': { 'Authorization':'Bearer ' +localStorage.getItem('token')}})
				.then(response => {
					this.products = response.data.response;
				}).catch(err => {
					console.log(err);
				});
			},
			setPages () {
				let numberOfPages = Math.ceil(this.orders.length / this.perPage);
				var newPages = [];
				for (let index = 1; index <= numberOfPages; index++) {
					newPages.push(index);
				}
				this.pages = newPages ;
				this.page = 1;
			},
			paginate (orders) {
				let page = this.page;
				let perPage = this.perPage;
				let from = (page * perPage) - perPage;
				let to = (page * perPage);
				this.FromTo =  (from + 1) + ' - ' + to + ' arasında';
				this.orderLenght = this.orders.length;
				return  orders.slice(from, to);
			},
			filterStartDate(orders){
				if(this.datetimeStart != '')
					return orders.filter(order => {
							return Date.parse(order.dateTime) >= Date.parse(this.datetimeStart);
					});
				else
				{
					return orders;
				}
				
			},
			filterEndDate(orders){
				if(this.datetimeEnd != '')
				{
					return orders.filter(order => {
						return Date.parse(order.dateTime) <= Date.parse(Date.parse(this.datetimeEnd));
					});
				}
				else
				{
					return orders;
				}
				
			},
			filterProduct(orders){
				if(this.selectProduct != '' && this.selectProduct != 0)
				{
					return orders.filter(order => {
						return order.order_log_product_id == this.selectProduct;
					});
				}
				else
				{
					return orders;
				}
				
			},
			filterTable(orders){
				if(this.selectTable != '' && this.selectTable != 0)
				{
					return orders.filter(order => {
						return order.order_log_table_id == this.selectTable;
					});
				}
				else
				{
					return orders;
				}				
			},
			filter(){

				var copyOrder1 = this.reportOrders;
				var copyOrder2 = this.filterStartDate(copyOrder1);
				var copyOrder3 = this.filterEndDate(copyOrder2);
				var copyOrder4 = this.filterProduct(copyOrder3);
				var copyOrder5 = this.filterTable(copyOrder4);

				this.orders = copyOrder5;
				
			},
			excelOrder(){
				var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
			    var textRange; var j=0;
			    var tab = this.$refs.downloadTable;
			    var tab2 = document.getElementById('downloadTable');
			    for(j = 0 ; j < tab.rows.length ; j++) 
			    {     
			        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
			        //tab_text=tab_text+"</tr>";
			    }

			    tab_text=tab_text+"</table>";
			    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
			    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
			    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

			    var ua = window.navigator.userAgent;
			    var msie = ua.indexOf("MSIE "); 

			    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
			    {
			        txtArea1.document.open("txt/html","replace");
			        txtArea1.document.write(tab_text);
			        txtArea1.document.close();
			        txtArea1.focus(); 
			        var sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
			    }  
			    else                 //other browser not tested on IE 11
			        var sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

			    return (sa);
			},
			printOrder(){
				var myWindow = window.open("" , "_blank" , "height=700,width=700");

				var tableHtml = this.$refs.printTable;
				myWindow.document.write(tableHtml.outerHTML);    			
				myWindow.print();
				myWindow.close();
			}
		},
		computed: {
			displayedOrders () {
				return this.paginate(this.orders);
			}
		},
		watch: {
			orders () {
				this.setPages();
			},
			datetimeStart:function(newVal, oldVal)
			{
				if(Date.parse(this.datetimeStart) > Date.parse(this.datetimeEnd))
				{
					this.datetimeStart = new Date(this.datetimeEnd).toISOString();
				}
				else
				{
					this.filter();
				}
			},
			datetimeEnd:function(newVal, oldVal){
				if(Date.parse(this.datetimeStart) > Date.parse(this.datetimeEnd))
				{
					this.datetimeEnd = new Date(this.datetimeStart).toISOString();
				}
				else
				{
					this.filter();
				}
			},
			selectTable:function(newVal, oldVal){
				this.filter();
			},
			selectProduct:function(newVal, oldVal){
				this.filter();
			}
		},
		created(){
			this.getReport();
			this.getTable();
			this.getProduct();
			screen.width < 769 ? this.perPage = 4 : false;
			screen.width > 769 ? this.isMobile = false : this.isMobile = true;
		},
		filters: {
			trimWords(value){
				return value.split(" ").splice(0,20).join(" ") + '...';
			}
		}
	}
</script>

<style scoped>

	.gosterim {
		font-size: 16px;
		line-height: 34px;
		text-align: center;
		color: #1c1c1c;
		padding-right: 10px;
	}

	.fromTo {
		font-size: 13px;
		color: #9a9494;
		padding: 0 20px;
		background: #ffffff;
	}

	.fromTo:before {
		content: '';
		width: 100%;
		height: 1px;
		background: #efeeee;
		position: absolute;
		left: 0;
		top: 10px;
		z-index: -1;
	}

	.emptyDate {
	    position: absolute;
	    right: 19px;
	    top: 0;
	    font-size: 28px;
	    line-height: 35px;
	    cursor: pointer;
	    color: #1c1c1c;
	}

	.emptyDate:hover {
	    color: #7c7c7c;
	}
</style>