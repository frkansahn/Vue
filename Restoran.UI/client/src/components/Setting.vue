<template>
	<div id="Setting">
		<Header/>
		<div class="container">
            <div class="row mt-4">
                <div class="col-12 px-4 p-lg-0">
                    <div class="row mb-3" v-for="(content,index) in contents">
                        <span class="col-12 dropdown" contenteditable v-bind:id="[`siteVisibleName${content.contentId}`]" @click="e => e.target.classList.toggle('active')">{{content.siteVisibleName}}</span>
                        <transition name="fade">
                            <div class="col-12 dropcontent d-none">
                                <div class="row mt-3">
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

                                       v-model="content.contentDescription"
                                    />
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12 p-0">
                                        <button class="btn btn-success btn-small px-3 py-1 float-right" type="button" name="save" @click="fn_saveContent(content.contentId)">
                                            Kaydet
                                        </button>
                                        <button class="btn btn-info btn-small px-3 py-1 mr-3 float-right" type="button" name="save" @click="fn_previewContent(content.contentId)">
                                            Önizleme
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="row mb-3">
                        <span class="col-12 dropdown" @click="e => e.target.classList.toggle('active')">E-mail Gönder</span>
                        <transition name="fade">
                            <div class="col-12 dropcontent d-none">
                                <div class="row mt-3">
                                    <div class="col-lg-6 col-12 pb-2">
                                        <span class="col-12 pl-0">Gönderilecek Adres</span>
                                        <input type="email" name="toMail" placeholder="örn: ornek@ornek.com.tr" class="form-control col-lg-10 col-12" v-model="toMail">                    
                                    </div>
                                    <div class="col-lg-6 col-12 pb-2">
                                        <span class="col-12 pl-0">Konu</span>
                                        <input type="text" name="toSubject" class="form-control col-lg-10 col-12" v-model="subject">                    
                                    </div>
                                    <div class="col-12 pb-2 pt-3 pt-lg-0">
                                        <editor
                                           api-key="6o9ewvq6bt1zsdfx45k1wym6rdyfmhe5xb2dczqj7sapvqtt"
                                           cloud-channel="5"
                                           :init="{
                                                selector: 'textarea',
                                                height: 500,
                                                menubar: true,
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

                                           v-model="mailHtml"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-success btn-sm" @click="sendMail">Gönder</button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <transition name="fade">
                <div class="popup bg-white" v-show="isPreviewHelp">
                    <div class="popupContent col-12">
                        <div class="container">
                            <div class="row py-5">
                                <div class="col-12 border rounded max-h-400 overflow-auto">
                                    <div class="row m-lg-5 m-1">
                                        <div class="col-12 help py-5" v-html="previewContent">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="close" @click="isPreviewHelp = false">
                        &times;
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
		name:'Setting',
		components:{
			Header , Footer , 'editor': Editor
		},
        props: {
            defaultValue: String,
            disabled: Boolean
        },
		data(){
			return{
                contents:[],
                previewContent:'',
                isPreviewHelp:false,
                toMail:'',
                subject:'',
                mailHtml:''
            }
        },
        methods:{
            sendMail(){
                Swal.fire({
                    title: 'Emin misin?',
                    text: "Göndermek istiyor musunuz?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Evet',
                    cancelButtonText: 'Hayır'
                }).then((result) => {
                    if (result.value == true) {

                        axios.post(this.$store.state.apiUrl + '/api/v1/mail/send',{'subject':this.subject ,'html':this.mailHtml, 'text':'Deneme Text' , 'toMail':this.toMail} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
                        .then(response => {
                            if(!response.success)
                            {
                                Swal.fire(
                                    '',
                                    'Başarılı.',
                                    'success'
                                    );
                                this.getStart();
                            }
                            else
                            {
                                Swal.fire(
                                    '',
                                    'Başarısız.',
                                    'error'
                                    );
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                })
            },
            imageUpload(file){
                let formData = new FormData();
                formData.append('file', file);
      
                this.axios.post(this.$store.state.apiUrl + '/api/v1/image/upload',
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                  }
                ).then(response => {
                      return true;
                })
                .catch(function(){
                  return false;
                });

                return true;
            },
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
            fn_previewContent(contentId)
            {
                this.isPreviewHelp = true;
                var result = '';
                this.contents.map(function(val,key){
                    if(val.contentId == contentId)
                    {
                        result = val.contentDescription;
                    }
                })
                this.previewContent = result;
            },
        	fn_saveContent(id){
                var contentname = '';
                var siteVisibleName = document.getElementById('siteVisibleName'+id).innerText;
                var contentdescription = '';
                var createdat = '';
                var updateat = '';

                this.contents.map(function(val,key){
                    if(val.contentId == id)
                    {
                        contentname = val.contentName;
                        contentdescription = val.contentDescription.replace("'","`");
                        createdat = val.createdAt.replace('T',' ').split('.')[0];
                    }
                });
                console.log(siteVisibleName);
        		var updateDate = this.nowDate();
        		updateat = updateDate;
        		Swal.fire({
        			title: 'Emin misin?',
        			text: "Güncellemek istiyor musunuz?",
        			icon: 'question',
        			showCancelButton: true,
        			confirmButtonColor: '#3085d6',
        			cancelButtonColor: '#d33',
        			confirmButtonText: 'Evet',
        			cancelButtonText: 'Hayır'
        		}).then((result) => {
        			if (result.value == true) {

        				axios.post(this.$store.state.apiUrl + '/api/v1/content/'+id,{'contentName':contentname ,'siteVisibleName':siteVisibleName, 'contentDescription':contentdescription , 'createdAt':createdat , 'updateAt':updateat} ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
        				.then(response => {
        					if(!response.data.error)
        					{
        						Swal.fire(
        							'',
        							'Başarılı.',
        							'success'
        							);
        						this.getStart();
        					}
        					else
        					{
        						response.data.error.sqlMessage ? console.log(response.data.error.sqlMessage) : false;
        						Swal.fire(
        							'',
        							'Başarısız.',
        							'error'
        							);
        					}
        				}).catch(err => {
        					console.log(err);
        				});
        			}
        		})
        	},
        	getStart(){
        		axios.get(this.$store.state.apiUrl + '/api/v1/content' ,{'headers': { 'Authorization':'Bearer ' + localStorage.getItem('token')}})
        		.then(response => {
        			this.contents = response.data.response;
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
	.ck-editor__editable  {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
		outline: none;
		border: 1px solid #c4c4c4;
	}

	.max-h-400
	{
		max-height: 400px;
	}
</style>