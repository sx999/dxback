import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 基础配置
import Index from '../views/Admin/Index.vue'
import Home from '../views/Admin/Home.vue'
import About from '../views/Admin/About.vue'
import NoMatch from '../views/Admin/NoMatch.vue'

//图片处理
import Picture from '../views/Admin/PictureProcessing/index.vue'
import Banner from '../views/Admin/PictureProcessing/Banner.vue'
import Brochure from '../views/Admin/PictureProcessing/Brochure.vue'
//产品详情
import Product from '../views/Admin/ProductDetails/index.vue'
import Device from '../views/Admin/ProductDetails/Device.vue'
import Featurefun from '../views/Admin/ProductDetails/Featurefun.vue'
import Advantage from '../views/Admin/ProductDetails/Advantage.vue'
import Solution from '../views/Admin/ProductDetails/Solution.vue'
//文章管理
import Content from '../views/Admin/ContentsActivity/index.vue'
import CompanyProfile from '../views/Admin/ContentsActivity/CompanyProfile.vue'
import Industry from '../views/Admin/ContentsActivity/Industry.vue'

//信息管理
import Message from '../views/Admin/Information/index.vue'
import Apply from '../views/Admin/Information/Apply.vue'
import Attract from '../views/Admin/Information/Attract.vue'
import Cooperative from '../views/Admin/Information/Cooperative.vue'
//系统设置
import System from '../views/Admin/SystemConfig/index.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Index',
    component:Index,
    children:[
      {path:"home",component:Home},
      {path:"",redirect:"home"},    //没有输入值时 重定向到home 页面
      {path:"about",component:About},
      {path:"product",component:Product,
      children:[
        {path:"advantage",component:Advantage},
        {path:"featurefun",component:Featurefun},
        {path:"device",component:Device},
        {path:"solution",component:Solution},
      ]},
      {path:"picture",component:Picture,
      children:[
        {path:"banner",component:Banner},
        {path:"brochure",component:Brochure},
      ]},
      {path:"content",component:Content,
      children:[
        {path:"companyprofile",component:CompanyProfile},
        {path:"industry",component:Industry},
      ]},
      {path:"message",component:Message,
      children:[
        {path:"apply",component:Apply},
        {path:"attract",component:Attract},
        {path:"cooperative",component:Cooperative},
      ]},
      {path:"system",component:System},
    ]
  },
  //登录
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
  	path:"*",
  	component:() => import('../views/Admin/NoMatch.vue')
  	// 配置404 页面  当访问路由path 值不存在时 跳转到NoMatch 组件
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

 //路由守卫 
 router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行 
 if(to.path === '/login') return next()
  // 从 localStorage 中获取到 保存的 token 值 
 const tokenStr = sessionStorage.getItem('cat_token')
 // 没有token，强制跳转到登录页 
 if(!tokenStr)  next({path: '/login'})
 // 存在token 直接放行
 next()
 })
export default router
