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
    // 话费充值界面
    {
      path: '/',
      name: 'recharge',
      component: () => import('./views/Recharge.vue')
    },
    // 激活界面
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('./views/Ticket.vue')
    },
    // 油卡绑定
    {
      path: '/oilCard',
      name: 'oilCard',
      component: () => import('./views/OilCard.vue'),
    },
    // 油卡充值说明
    {
      path:'/explain',
      name:'explain',
      component: () => import('./views/Explain.vue')
    },
    // 话费充值说明
    {
      path:'/explainhf',
      name:'explainhf',
      component: () => import('./views/ExplainHF.vue')
    },
    // 个人中心->意见反馈
    {
      path:'/feedback',
      name:'feedback',
      component: () => import('./views/Feedback.vue')
    },
    // 个人中心
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
    // 登录
    {
      path:'/userLogin',
      name:'userLogin',
      component: () => import('./views/UserLogin.vue')
    },
    // 加载
    {
      path:'/locad',
      name:'locad',
      component: () => import('./views/Locad.vue')
    },
    {
      path:'/locadhf',
      name:'locadhf',
      component: () => import('./views/Locadhf.vue')
    }
  ]
})
