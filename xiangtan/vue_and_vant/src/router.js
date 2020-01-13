import Vue from 'vue'
import Router from 'vue-router'
import Recharge from './views/Recharge.vue';
import Mine from './views/Mine.vue';
import Me from './views/Me.vue';


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/mine',
      component:Mine,
      meta:{
        showTab:true
      }
    },
    {
      path:'/recharge',
      component:Recharge,
      meta:{
        showTab:true
      }
    },
    {
      path:'/me',
      component:Me,
      meta:{
        showTab:true
      }
    },
    {
      path: '/',
      name: 'mine',
      component: () => import('./views/Mine.vue')
    },
    {
      path: '/',
      name: 'recharge',
      component: () => import('./views/Recharge.vue')
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('./views/Ticket.vue')
    },
    {
      path: '/oilCard',
      name: 'oilCard',
      component: () => import('./views/OilCard.vue'),
    },
    {
      path:'/explain',
      name:'explain',
      component: () => import('./views/Explain.vue')
    },{
      path:'/explainhf',
      name:'explainhf',
      component: () => import('./views/ExplainHF.vue')
    },
    {
      path:'/me',
      name:'me',
      component: () => import('./views/Me.vue')
    },
    // 个人中心->代理中心
    {
      path:'/agency',
      name:'agency',
      component: () => import('./views/Agency.vue')
    },
     // 个人中心->我的订单
     {
      path:'/myorder',
      name:'myorder',
      component: () => import('./views/MyOrder.vue')
    },
    {
      path:'/userLogin',
      name:'userLogin',
      component: () => import('./views/UserLogin.vue')
    },
    // 油卡加载
    {
      path:'/locad',
      name:'locad',
      component: () => import('./views/Locad.vue')
    },
    // 话费加载
    {
      path:'/locadhf',
      name:'locadhf',
      component: () => import('./views/Locadhf.vue')
    }
  ]
})
