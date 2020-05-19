<template>
	<div id="Cari">
		<Header/>
		<div class="container">
			<div class="row mt-3">
				<div class="col-lg-6 col-12">
					<div class="chart">
						<line-chart :data="dataMountTotalPrice" label-rotate rainbow zoom smooth />
					</div>
				</div>
				<div class="col-lg-6 col-12">
					<div class="chart">	
						<BarChart  
						:data="dataMountUserTotalOrder"
						x-name="Zaman"
						y-name="Sipariş"
						label-rotate
						zoom
						horizontal
						:animation="true"
						/>
					</div>
				</div>		
			</div>
			<div class="row mt-2">
				<div class="col-lg-6 col-12">
					<div class="chart">						
						<BarChart  
						:data="dataMount"
						x-name="Zaman"
						y-name="Sipariş"
						zoom
						:animation="true"
						/>
					</div>
				</div>
				<div class="col-lg-6 col-12">
					<div class="chart">						
						<BarChart 
						v-if="loaded"  
						:data="dataMountTotalPrice"
						x-name="Zaman"
						y-name="Sipariş"
						zoom
						rainbow
						:animation="true"
						/>
					</div>
				</div>
				
			</div>
			<div class="row mt-2">
				<div class="col-lg-6 col-12">
					<div class="chart">
						<pie-chart :data="dataPastaDilim" />	
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
	import axios from 'axios'
	
	export default{
		name:'About',
		components:{
			Header , Footer
		},
		props: {
		},
		data(){
			return{
				loaded:false,
				users:[],
				dataMount:[
				],
				dataMountTotalPrice:[{
					name: "Aylara Göre Satış Tutarı(Fiyat)",
					backgroundColor: 'red',
					data: [
					]
				}],
				dataPastaDilim:[{
		          name: 'Deneme1',
		          value: 30,
		        },
		        {
		          name: 'Deneme2',
		          value: 15,
		        },
		        {
		          name: 'Deneme3',
		          value: 8,
		        }],
				dataMountUserTotalOrder: [
				{
					name: "Deneme1",
					data: [
					{ label: '2010', value: 8 },
					{ label: '2011', value: 10 },
					{ label: '2012', value: 12 },
					{ label: '2013', value: 7 },
					{ label: '2014', value: 9 },
					{ label: '2015', value: 16 },
					{ label: '2016', value: 15 },
					{ label: '2017', value: 18 },
					{ label: '2018', value: 20 },
					{ label: '2019', value: 5 },
					{ label: '2020', value: 9 },
					]
				},
				{
					name: "Deneme2",
					data: [
					{ label: '2010', value: 8 },
					{ label: '2011', value: 2 },
					{ label: '2012', value: 2 },
					{ label: '2013', value: 7 },
					{ label: '2014', value: 9 },
					{ label: '2015', value: 1 },
					{ label: '2016', value: 23 },
					{ label: '2017', value: 18 },
					{ label: '2018', value: 20 },
					{ label: '2019', value: 5 },
					{ label: '2020', value: 9 },
					]
				}],
				datacollection:{
					labels: ['Ocak', 'Şubat' , 'Mart' ,'Nisan' , 'Mayıs' , 'Haziran' , 'Temmuz' , 'Agustos' , 'Eylül' , 'Ekim' , 'Kasım' , 'Aralık'],
					datasets: [{
						label: 'Aylık Gelir',
						backgroundColor: '#28cc34',
						data: []
					}]
				},
				options:{
					responsive: true,
					lineTension: 1,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								padding: 25,
							}
						}]
					}
				},
				year:2020,
				price:[]
			}
		},
		methods:{
			getStart(){
				axios.get(this.$store.state.apiUrl + '/api/v1/report/' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					var reports = response.data.response;

					var ocak = 0;
					var subat = 0;
					var mart = 0 ;
					var nisan = 0;
					var mayis = 0;
					var haziran = 0;
					var temmuz = 0;
					var agustos = 0;
					var eylul = 0;
					var ekim = 0;
					var kasim = 0;
					var aralik = 0;

					for (var i = reports.length - 1; i >= 0; i--) {
						var yil = new Date(reports[i].dateTime).getFullYear();
						var ay = new Date(reports[i].dateTime).getMonth();
						if(yil == this.year)
						{
							switch(ay)
							{
								case 0:
								ocak = Number(ocak) + 1;
								break;
								case 1:
								subat = Number(subat) + 1;
								break;
								case 2:
								mart = Number(mart) + 1;
								break;
								case 3:
								nisan = Number(nisan) + 1;
								break;
								case 4:
								mayis = Number(mayis) + 1;
								break;
								case 5:
								haziran = Number(haziran) + 1;
								break;
								case 6:
								temmuz = Number(temmuz) + 1;
								break;
								case 7:
								agustos = Number(agustos) + 1;
								break;
								case 8:
								eylul = Number(eylul) + 1;
								break;
								case 9:
								ekim = Number(ekim) + 1;
								break;
								case 10:
								kasim = Number(kasim) + 1;
								break;
								case 11:
								aralik = Number(ocak) + 1;
								break;
								default:
								console.log('');
							}
						}
					}
					this.datacollection = {
						labels: ['Ocak', 'Şubat' , 'Mart' ,'Nisan' , 'Mayıs' , 'Haziran' , 'Temmuz' , 'Agustos' , 'Eylül' , 'Ekim' , 'Kasım' , 'Aralık'],
						datasets: [{
							label: 'Aylık Gelir',
							backgroundColor: '#28cc34',
							data: [ocak ,subat , mart , nisan , mayis , haziran , temmuz , agustos , eylul , ekim , kasim , aralik]
						}]
					};

					this.dataMount =[{
						name: "Aylara Göre Sipariş Miktarı",
						data: [
						{ label: 'Ocak', value: ocak },
						{ label: 'Şubat', value: subat },
						{ label: 'Mart', value: mart },
						{ label: 'Nisan', value: nisan },
						{ label: 'Mayıs', value: mayis },
						{ label: 'Haziran', value: haziran },
						{ label: 'Temmuz', value: temmuz },
						{ label: 'Agustos', value: agustos },
						{ label: 'Eylül', value: eylul },
						{ label: 'Ekim', value: ekim },
						{ label: 'Kasım', value: kasim },
						{ label: 'Aralık', value: aralik },
						]
					}] 
				}).catch(err => {
					console.log(err);
				});
			},
			getTotalPrice(){
				var yil = this.year;

				axios.get(this.$store.state.apiUrl + '/api/v1/report/getTotalPrice/'+yil , {'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {

					this.dataMountTotalPrice[0].data = response.data.response;			
				})
				.catch(err => {
					console.log(err);
				})			
			}
		},
		async mounted(){
			try{
				this.year = new Date().getFullYear();
				await this.getTotalPrice();
				this.getStart();
				this.loaded = true;
			}
			catch(err){
				console.log(err);
			}
		}
		
	}
</script>
<style scoped>
	.chart {
		width: 100%;
		height: 400px;
	}
</style>