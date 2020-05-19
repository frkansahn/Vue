<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router/index'
  import Home from './components/Home.vue'
  import Order from './components/Order.vue'
  import Table from './components/Table.vue'
  import Login from './components/Login.vue'
  import Report from './components/Report.vue'
  import Account from './components/Account.vue'
  import User from './components/User.vue'
  import Help from './components/Help.vue'
  import About from './components/About.vue'
  import Setting from './components/Setting.vue'
  import Product from './components/Product.vue'
  import Integration from './components/Integration.vue'
  import ProductShow from './components/ProductShow.vue'
  import Cari from './components/Cari.vue'
  import NotFound from './components/NotFound.vue'
  import axios from 'axios'

  export default {
    name: 'app',
    components: {
      Login,Home,Order,Table,Report,Account,User,NotFound,Product,Setting,Help,About,Integration,
      ProductShow
    },
    watch: {
        $route(to, from) {
          document.title = 'Restoran - ' + to.name || 'Restoran';
        }
    },
    created(){
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if(user)
      {
        this.$store.commit('newUser' , user);
      }

      if(token == '' || token == false ||token == 'undefined' || token == null)
      {
        if(window.location.pathname != "/login")
        {
          this.$router.push('');
        }
      }
      else
      {
       if(user)
       {
         axios.post(this.$store.state.apiUrl + '/api/v1/token' , {'username':user.username , 'password':user.password}).then(response => {
          if(window.location.pathname == "/login")
          {
            this.$router.push('/');
          }
        }).catch(err => {
          console.log(err);
          this.$router.push('login');
        });
      }
      else
      {
        this.$router.push('login');
      }
    }    
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
