<template>
	<div id="order">
		<Header/>
		<div class="container" id="masa">
			<div class="row mt-4">
				<div class="m-2 p-2 border rounded float-left hover-ef cursor-pointer" @click="isTableAdd = true , isTableEdit = false , tableName = '' , table_status = '' , table_id = ''" v-if="this.$store.state.roleStatus == 1">
					<strong>+</strong> Yeni Masa Ekle
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-lg-3 col-sm-4 col-6 p-2" v-for="table in tables">
					<div class="col-12 p-0 position-relative orderTable">
						<router-link class="col-12 border rounded py-5 text-center" :class="{dolu:table.table_status == 1}" :to="'/masa/' + table.table_id">
							<img src="/images/desk.png" alt="Desk">{{table.table_name}}						
						</router-link>
						<span class="editTable" title="Masa Düzenle" @click="editTableShow(table)" v-if="isAdmin"></span>
					</div>
				</div>
			</div>

			<transition name="fade">
				<div class="popup" v-show="isTableAdd">
					<div class="popupContent col-2">
						<div class="row">
							<div class="col-12 mb-2">
								<span class="tableAdd" v-if="!isTableEdit">Masa Ekle</span>
								<span class="tableAdd" v-if="isTableEdit">Masa Düzenle</span>
							</div>
							<div class="col-12 pt-2">
								<div class="row">
									<span class="col-12 text-left required">Masa Adı</span>
									<div class="col-12">
										<input type="text" name="name" class="form-control col" v-model="tableName" required="required">
									</div>
								</div>
							</div>
							<div class="col-12 pt-2" v-if="isTableEdit">
								<div class="row">
									<span class="col-12 text-left required">Masa Durumu</span>
									<div class="col-12">
										<select name="tableStatus" class="form-control col" v-model="tableStatus">
											<option value="0">Boş</option>
											<option value="1">Dolu</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-12">
								<button type="submit" name="tableAdd" v-if="!isTableEdit" class="btn btn-success col-12 mt-4" @click="fn_addNewTable">Ekle</button>
								<button type="submit" name="tableAdd" v-if="isTableEdit" class="btn btn-success col-12 mt-4" @click="fn_editTable">Güncelle</button>
							</div>
						</div>
					</div>
					<div class="overlay" @click="isTableAdd = false">

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

	export default{
		name:'Order',
		components:{
			Header,Footer
		},
		props:{

		},
		data(){
			return{
				tables:[],
				isTableAdd:false,
				isTableEdit:false,
				table_id:'',
				tableName:'',
				tableStatus:'',
				isAdmin:false
			}
		},
		methods:{
			getTable(){
				axios.get(this.$store.state.apiUrl + '/api/v1/table' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					this.tables = response.data.response;
				}).catch(err => {
					console.log(err);
				});	
			},
			editTableShow(table)
			{
				this.isTableEdit = true;
				this.isTableAdd = true;
				this.table_id = table.table_id;
				this.tableName = table.table_name;
				this.tableStatus = table.table_status;

			},
			fn_addNewTable(){
				Swal.fire({
					title: 'Emin misin?',
					text: "Masayı eklemek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.post(this.$store.state.apiUrl + '/api/v1/table/add/' , {'table_name':this.tableName} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								Swal.fire(
									'',
									'Masa eklendi.',
									'success'
									);
								this.isTableAdd = false;
								this.getTable();
								this.tableName = '';
							}
							else
							{
								response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
								Swal.fire(
									'',
									'Masa eklenemedi.',
									'error'
									);
							}

						}).catch(err => {
							console.log(err);
						});
					}
				})
			},
			fn_editTable(){
				axios.post(this.$store.state.apiUrl + '/api/v1/table/'+ this.table_id , {'table_name':this.tableName , 'table_status':this.tableStatus} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					if(!response.data.error)
					{
						Swal.fire(
							'',
							'Masa güncellendi.',
							'success'
							);
						this.isTableAdd = false;
						this.editTable = false;
						this.getTable();
						this.tableName = '';
						this.tableStatus = '';
						this.table_id = '';
					}
					else
					{
						response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
						Swal.fire(
							'',
							'Masa güncellenemedi.',
							'error'
							);
					}

				}).catch(err => {
					console.log(err);
				});
			}
		},
		created(){
			this.getTable();		
		},
		mounted()
		{
			this.isAdmin = this.$store.state.roleStatus == 1 ? true : false;
		}
	}
</script>

<style scoped>
	#masa a:hover {
		text-decoration: inherit;
		background: #1dc51e;
	}

	.hover-ef:hover
	{
		background: #efefef;
	}

	#masa a {
		background: #11e011;
		color: #ffffff;
		font-size: 20px;
		font-weight: 300;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#masa a.dolu {
		background: #ff0202;
		color: #ffffff;
	}

	#masa a.dolu:hover
	{
		background: #da1515;
	}

	#masa a img
	{
		margin-right: 5px;
	}

	.cursor-pointer
	{
		cursor: pointer;
	}

	.tableAdd
	{
		font-size: 20px;
		font-weight: 600;
		line-height: normal;
	}
	.editTable
	{
		display: none;
		position: absolute;
		bottom: 5px;
		right: 5px;
		width: 40px;
		height: 40px;
		background: url(/images/edit.svg) no-repeat center center #0000004f;
		border-radius: 30px;
		cursor: pointer;
	}

	#masa .orderTable:hover .editTable
	{
		display: block;
	}
</style>