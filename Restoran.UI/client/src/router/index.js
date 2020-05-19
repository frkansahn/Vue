import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Order from '@/components/Order'
import Report from '@/components/Report'
import Account from '@/components/Account'
import User from '@/components/User'
import Table from '@/components/Table'
import Help from '@/components/Help'
import About from '@/components/About'
import Setting from '@/components/Setting'
import Product from '@/components/Product'
import Integration from '@/components/Integration'
import ProductShow from '@/components/ProductShow'
import Cari from '@/components/Cari'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Anasayfa',
      component: Home
    },
    {
      path: '/rapor',
      name: 'Raporlar',
      component: Report
    },
    {
      path: '/siparisler',
      name: 'Siparisler',
      component: Order
    },
    {
      path: '/hesap',
      name: 'Hesap',
      component: Account
    },
    {
      path: '/user',
      name: 'Kullanıcı',
      component: User
    },
    {
      path: '/product',
      name: 'Ürün',
      component: Product
    },
    {
      path:'/productDetail/:id',
      name:'Product Detail',
      component: ProductShow
    },
    {
      path: '/cari',
      name: 'Cari',
      component: Cari
    },
    {
      path: '/integration',
      name: 'Entegrasyon',
      component: Integration
    },
    {
      path: '/help',
      name: 'Yardım',
      component: Help
    },
    {
      path: '/about',
      name: 'Hakkında',
      component: About
    },
    {
      path: '/setting',
      name: 'Ayarlar',
      component: Setting
    },
    {
      path: '/masa/:id',
      name: 'Masa Detay',
      component: Table
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
