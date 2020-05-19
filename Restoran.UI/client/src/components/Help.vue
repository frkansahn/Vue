<template>
	<div id="Help">
		<Header/>
			<div class="container">
				<div class="row mt-3">
					<div class="col-12 text-center">
						<h2>{{helpTitle}}</h2>
					</div>
					<div class="col-12 help py-5" v-html="help">
						
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
		name:'Help',
		components:{
			Header , Footer
		},
		data(){
			return{
				help:'',
				helpTitle:''
			}
		},
		methods:{
			getStart(){
				axios.get(this.$store.state.apiUrl + '/api/v1/content/1' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.help =  response.data.response[0].contentDescription;
					this.helpTitle = response.data.response[0].siteVisibleName;
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