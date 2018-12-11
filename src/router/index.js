import Vue from 'vue'
import Router from 'vue-router'

import loginParent from '@/components/login/loginParent'
// import sidebarParent from '@/components/sidebar/sidebarParent'

import index from '@/page/index/index'
import Home from '@/components/Home'

//用户
import industry from '@/page/industry/industry'
//行业管理
import role from '@/page/role/role'
//商户列表
import business from '@/page/business/business'
// //产品列表
// import product from '@/page/product/product'
//添加菜单
import addMenu from '@/page/addMenu/addMenu'
// 产品分类
import PClassification from '@/page/PClassification/PClassification'
// 产品单位
import PCompany from '@/page/PCompany/PCompany'
// 产品品牌
import PBrand from '@/page/PBrand/PBrand'
// 产品规格
import PSpecifications from '@/page/PSpecifications/PSpecifications'
// 产品列表
import Plist from '@/page/Plist/Plist'
//新建产品列表
import NewPlist from '@/page/Plist/NewPlist'
//编辑产品列表PSku
import EditPlist from '@/page/Plist/EditPlist'
//产品sku
import PSku from '@/page/PSku/PSku'
// 订单列表
import OrderList from '@/page/OrderList/OrderList'
import update from '@/page/updatepwd/updatepwd'
Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'loginParent',
      component: loginParent
    },
    {
      path: '/home',
      // name: 'Home',
      component: Home,
      children: [
        {
          path: '/addMenu',
          name: 'addMenu',
          mata: {
            title: '添加菜单'
          },
          component: addMenu
        },
        {
          path: '/',
          name: 'index',
          mata: {
            title: '首页'
          },
          component: index
        },
        {
          path: '/industry',
          name: 'industry',
          mata: {
            title: '行业管理'
          },
          component: industry
        },
        {
          path: '/business',
          name: 'business',
          mata: {
            title: '商户列表'
          },
          component: business
        },
        {
          path: '/role',
          name: 'role',
          mata: {
            title: '角色管理'
          },
          component: role
        },
        {
          path: '/PClassification',
          name: 'PClassification',
          mata: {
            title: '产品分类'
          },
          component: PClassification
        },
        {
          path: '/PCompany',
          name: 'PCompany',
          mata: {
            title: '产品单位'
          },
          component: PCompany
        },
        {
          path: '/PBrand',
          name: 'PBrand',
          mata: {
            title: '产品品牌'
          },
          component: PBrand
        },
        {
          path: '/PSpecifications',
          name: 'PSpecifications',
          mata: {
            title: '产品规格'
          },
          component: PSpecifications
        },
        {
          path: '/Plist',
          name: 'Plist',
          mata: {
            title: '产品列表'
          },
          component: Plist
        },
        {
          path: '/NewPlist',
          name: 'NewPlist',
          mata: {
            title: '新建产品列表'
          },
          component: NewPlist
        },
        {
          path: '/EditPlist',
          name: 'EditPlist',
          mata: {
            title: '编辑产品列表'
          },
          component: EditPlist
        },
        {
          path: '/PSku',
          name: 'PSku',
          mata: {
            title: '产品sku'
          },
          component: PSku
        },
        {
          path: '/OrderList',
          name: 'OrderList',
          mata: {
            title: '订单列表'
          },
          component: OrderList
        },
        {
          path: '/updatepwd',
          name: 'updatepwd',
          mata: {
            title: '修改密码'
          },
          component: update
        },
      ]
    }
  ],
})
