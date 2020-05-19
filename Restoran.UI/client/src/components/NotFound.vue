<template>
	<div id="notFound">
		<Header/>
		<div class="container">
			<div class="row">
				<div class="col-12 p-4">
					<h3 class="col-12 text-center">Aradığınız sayfa bulunamadı..!!</h3>
					<router-link :to="{path:'/anasayfa'}" class="p-2 d-block col-2 mx-auto border rounded go-home text-center">Anasayfa'ya Git</router-link>
					<a class="p-2 d-block col-1 mt-2 mx-auto border rounded go-home text-center" @click="$router.go(-1)">Geri Git</a>
				</div>
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'

	export default{
		name:'NotFound',
		components:{
			Header,Footer
		}
	}
</script>

<style scoped>
	.go-home
	{
		color: #000000;
		margin-top: 15px;
		cursor:pointer;
	}
</style>