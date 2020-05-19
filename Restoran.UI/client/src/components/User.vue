<template>
	<div class="border rounded p-2" id="account" ref="account">
		<div class="row">
			<div class="col-lg-3 col-6">
				<button type="button" class="btn btn-small btn-success col" @click="isUserAdd = true , isUserEdit = false , this.user.name = '' , this.user.surname = '' , this.user.username = '' , this.user.password = '' , this.user.cepNo = '' ,  this.user.role = '' , this.user.roleStatus = ''">+ Kullanıcı Ekle</button>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-12">
				<table class="table table-responsive-md">
					<thead>
						<tr>
							<th></th>
							<th>Resim</th>
							<th>İsim</th>
							<th>Soyisim</th>
							<th>Kullanıcı Adı</th>
							<th>Şifre</th>
							<th>Cep No</th>
							<th>Yetkinlik</th>
							<th>Tarih</th>
							<th></th>
						</tr>
						
					</thead>
					<tbody>
						<tr v-for="(U,index) in users">
							<td>
								{{index + 1}}
							</td>
							<td  scope="row" @click="lightbox(U.userImage)">
								<img v-if="U.userImage != '' && U.userImage != null" v-bind:src="`${apiUrl}/images/${U.userImage}`" v-bind:alt="U.name"/>
							</td>
							<td>
								{{U.name}}
							</td>
							<td>
								{{U.surname}}
							</td>
							<td>
								{{U.username}}
							</td>
							<td>
								{{U.password}}
							</td>
							<td>
								<span v-if="U.cepNo">{{U.cepNo}}</span>
							</td>
							<td>
								{{U.role}}
							</td>
							<td>
								{{U.createdAt | formatDate}}
							</td>
							<td class="d-flex">
								<a class="Delete" @click="fn_userDelete(U.id)">&times;</a>
								<a class="Edit ml-2" @click="userEditPopup(U)"></a>
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
			<div class="popup" v-show="isUserAdd">
				<div class="popupContent col-lg-5 col-11">
					<div class="row">
						<div class="col-12 mb-2">
							<span class="userAdd">Kullanıcı Ekle</span>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">İsim</span>
								<div class="col-12">
									<input type="text" name="name" class="form-control col" v-model="user.name" required="required">
								</div>
							</div>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">Soyisim</span>
								<div class="col-12">
									<input type="text" name="surname" class="form-control col" v-model="user.surname" >
								</div>
							</div>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">Kullanıcı Adı</span>
								<div class="col-12">
									<input type="text" name="name" class="form-control col" v-model="user.username" required="required">
								</div>
							</div>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">Şifre</span>
								<div class="col-12">
									<input type="text" name="surname" class="form-control col" v-model="user.password" required="required">
								</div>
							</div>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">Telefon</span>
								<div class="col-12">
									<vue-tel-input v-model="user.cepNo" v-bind="bindProps"></vue-tel-input>
								</div>
							</div>
						</div>
						<div class="col-6 pt-2">
							<div class="row">
								<span class="col-12 text-left required">Yetkinlik</span>
								<div class="col-12">
									<select class="form-control" v-model="user.role" v-on:change="fn_changeAuth" required="required">
										<option value="" selected="selected" disabled="disabled">Seçiniz..</option>
										<option value="admin">Tam Yetki</option>
										<option value="user">Sınırlı Yetki</option>
									</select>
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
									    <span class="position-relative" v-else>
									    	<img v-bind:src="`${apiUrl}/images/${user.userImage}`">
									    	<span class="imgDelete" @click="fn_imgDelete">&times;</span>
									    </span>
									</div>
								</div>
							</div>
						<div class="col-6 pt-2">
							<button type="submit" name="userAdd" class="btn btn-success col-12 mt-4" v-if="!isUserEdit" @click="fn_userAdd">Kullanıcı Ekle</button>
							<button type="submit" name="userEdit" class="btn btn-info col-12 mt-4" v-if="isUserEdit" @click="fn_userEdit">Güncelle</button>
						</div>
					</div>
				</div>
				<div class="overlay" @click="isUserAdd = false , isUserEdit = false">

				</div>				
			</div>
		</transition>
	</div>	
</template>

<script>
	import axios from 'axios'
	import Swal from 'sweetalert2'
	import { VueTelInput } from 'vue-tel-input'
	

	export default{
		name:'User',
		conmponents:{
			VueTelInput
		},
		props:{
		},
		data() {
			return {
				users:[],
				isUserAdd:false,
				isUserEdit:false,
				user:{
					id:'',
					name:'',
					surname:'',
					username:'',
					password:'',
					cepNo:'',
					role:'',
					roleStatus:'',
					modelNo:'',
					userImage:'',
					createdAt:'',
					updatedAt:''
				},
				bindProps: {
			        mode: "international",
			        defaultCountry: "TR",
			        disabledFetchingCountry: false,
			        disabled: false,
			        disabledFormatting: false,
			        placeholder: "Telefon numarasını giriniz..",
			        required: false,
			        enabledCountryCode: false,
			        enabledFlags: true,
			        preferredCountries: ["AU", "BR"],
			        onlyCountries: [],
			        ignoredCountries: [],
			        autocomplete: "off",
			        name: "telephone",
			        maxLen: 25,
			        wrapperClasses: "",
			        inputClasses: "",
			        dropdownOptions: {
			          disabledDialCode: false
			        },
			        inputOptions: {
			          showDialCode: false
			        }
			    },
				lightboxShow:false,
				lightboxImg:'',
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
			getUser(){
				axios.get(this.$store.state.apiUrl + '/api/v1/user',{'headers':{'Authorization':'Bearer '+localStorage.getItem('token')}})
				.then(response => {
					this.users = response.data.response;
				})
				.catch(err => {
					console.log(err);
				})
			},
			lightbox(imgSrc){
				this.lightboxImg = this.$store.state.apiUrl + "/images/"+imgSrc;
				this.lightboxShow = true;
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
	              this.user.userImage = response.data.response.filename;
	              this.showImg = false;
	            })
	            .catch(function(){
	              console.log('FAILURE!!');
	            });
			},
			fn_imgDelete()
			{
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
						axios.get(this.$store.state.apiUrl + '/api/v1/product/images/delete/'+this.user.userImage ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								this.user.userImage = '';
								this.showImg = true;
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
			fn_userAdd(){
				var nowDate = this.nowDate() || ' ';
				this.user.createdAt = nowDate;
				this.user.updatedAt = nowDate;
				this.user.modelNo = navigator.appName || '';
				if(this.user.cepNo.toString().indexOf('+') > -1)
				{
					this.user.cepNo = this.user.cepNo.toString().replace('+','').replace(/\s/g,'');
				}				
				var userInfo = {'name':this.user.name , 'surname':this.user.surname , 'username':this.user.username , 'password':this.user.password, 'cepNo':this.user.cepNo , 'role':this.user.role , 'roleStatus':this.user.roleStatus  , 'modelNo':this.user.modelNo ,'userImage': this.user.userImage , 'createdAt': nowDate , 'updatedAt': nowDate};
				Swal.fire({
					title: 'Emin misin?',
					text: "Kullanıcıyı eklemek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.post(this.$store.state.apiUrl + '/api/v1/user/add/', userInfo ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
						.then(response => {
							if(!response.data.error)
							{
								Swal.fire(
									'',
									'Kullanıcı eklendi.',
									'success'
									);
								this.isUserAdd = false;
								this.getUser();
								this.user.name = '';
								this.user.surname = '';
								this.user.username = '';
								this.user.password = '';
								this.user.cepNo = '';
								this.user.role = '';
								this.user.roleStatus = '';
								this.user.userImage = '';
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
					}
				});
			},
			fn_userEdit()
			{
				var nowDate = this.nowDate() || ' ';
				this.user.modelNo = navigator.appName || '';
				if(this.user.cepNo.toString().indexOf('+') > -1)
				{
					this.user.cepNo = this.user.cepNo.toString().replace('+','').replace(/\s/g,'');
				}
				var userInfo = {'name':this.user.name , 'surname':this.user.surname , 'username':this.user.username , 'password':this.user.password, 'cepNo':this.user.cepNo , 'role':this.user.role , 'roleStatus':this.user.roleStatus  , 'modelNo':this.user.modelNo ,'userImage':this.user.userImage , 'updatedAt': nowDate};
				axios.post(this.$store.state.apiUrl + '/api/v1/user/' + this.user.id, userInfo ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
				.then(response => {
					if(!response.data.error)
					{
						Swal.fire(
							'',
							'Kullanıcı güncellendi.',
							'success'
							);
						this.isUserAdd = false;
						this.getUser();
						this.$emit('getUser')				
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
			fn_userDelete(userId)
			{
				var token = localStorage.getItem('token');
				Swal.fire({
					title: 'Emin misin?',
					text: "Kullanıcıyı silmek istiyor musunuz?",
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Evet',
					cancelButtonText: 'Hayır'
				}).then((result) => {
					if (result.value == true) {
						axios.get(this.$store.state.apiUrl + '/api/v1/user/delete/'+userId ,{'headers': { 'Authorization':'Bearer ' + token}})
						.then(response => {
							Swal.fire(
								'',
								'Kullanıcı silindi.',
								'success'
								);
							this.getUser();

						}).catch(err => {
							console.log(err);
						});
					}
				});
			},
			userEditPopup(userEditInfo)
			{
				this.isUserAdd = true;
				this.isUserEdit = true;
				this.user = userEditInfo;
				userEditInfo.userImage == '' || userEditInfo.userImage == null ? this.showImg = true : this.showImg = false;
			},
			fn_changeAuth(){
				this.user.role == 'admin' ? this.user.roleStatus = '1' : this.user.roleStatus = '0'; 
			}
		},
		created(){
			this.getUser();
		}
	}
</script>

<style scoped>
	.userAdd {
		font-size: 20px;
		font-weight: 600;
		border-bottom: 1px solid #ebe8e8;
		padding: 5px;
	}
</style>