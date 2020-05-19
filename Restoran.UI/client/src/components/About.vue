<template>
	<div id="About">
		<Header/>
		<div class="container">
			<div class="row mt-3">
				<div class="col-12 text-center">
					<h2>{{aboutTitle}}</h2>
				</div>
				<div class="col-12 about py-3" v-html="about">
					
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
		data(){
			return{
				about:'',
				aboutTitle:''
			}
		},
		methods:{
			getStart(){
				axios.get(this.$store.state.apiUrl + '/api/v1/content/2' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {					
					this.about =  response.data.response[0].contentDescription;
					this.aboutTitle = response.data.response[0].siteVisibleName;
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
</style>