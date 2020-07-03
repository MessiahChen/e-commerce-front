import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/mvo',
    component: Layout,
    meta: { title: 'MVO', icon: 'peoples'},
    children: [
      {
        path: 'myinfo',
        component: () => import('@/views/mvo/mvo-myinfo'),
        name: 'myinfo',
        meta: { title: 'My Info', icon: 'form', affix: true }
      },
      {
        path: 'goodsAdd',
        component: () => import('@/views/mvo/mvo-goods-add'),
        name: 'goodsAdd',
        meta: { title: 'Goods Entry', icon: 'edit', affix: true }
      },
      {
        path: 'goodsPicture',
        component: () => import('@/views/mvo/mvo-goods-picture'),
        name: 'myinfo',
        meta: { title: 'Goods Images', icon: 'icon', affix: true }
      },
      {
        path: 'orderManagement',
        component: () => import('@/views/mvo/mvo-order-management'),
        name: 'orderManagement',
        meta: { title: 'Order Manage', icon: 'list', affix: true }
      },
      {
        path: 'mvoWallet',
        component: () => import('@/views/mvo/mvo-wallet/mvo-wallet'),
        name: 'mvoWallet',
        meta: { title: 'My Wallet', icon: 'money', affix: true }
      },
      {
        path: 'mvoAvailableMoney',
        component: () => import('@/views/mvo/mvo-wallet/mvo-available-money'),
        name: 'mvoAvailableMoney',
        hidden:true
      },
      {
        path: 'mvoTransactionRecord',
        component: () => import('@/views/mvo/mvo-wallet/mvo-transaction-record'),
        name: 'mvoTransactionRecord',
        hidden:true
      }
    ]
  },
  {
    path: '/bvo',
    component: Layout,
    meta: { title: 'BVO', icon: 'user'},
    children: [
      {
        path: 'myinfo',
        component: () => import('@/views/bvo/bvo-myinfo'),
        name: 'myinfo',
        meta: { title: 'My Info', icon: 'form', affix: true }
      },
      {
        path: 'storeManagement',
        component: () => import('@/views/bvo/bvo-store-management'),
        name: 'storeManagement',
        meta: { title: 'Store Manage', icon: 'component', affix: true }
      },
      {
        path: 'goodsHistory',
        component: () => import('@/views/bvo/bvo-goods-view'),
        name: 'goodsHistory',
        meta: { title: 'Goods Browse', icon: 'search', affix: true }
      },
      {
        path: 'wishList',
        component: () => import('@/views/bvo/bvo-wishList'),
        name: 'wishList',
        meta: { title: 'Wishlist', icon: 'star', affix: true }
      },
      {
        path: 'orderManagement',
        component: () => import('@/views/bvo/bvo-order-management'),
        name: 'orderManagement',
        meta: { title: 'Order Manage', icon: 'list', affix: true }
      },
      {
        path: 'bvoWallet',
        component: () => import('@/views/bvo/bvo-wallet/bvo-wallet'),
        name: 'bvoWallet',
        meta: { title: 'My Wallet', icon: 'money', affix: true },
      },
      {
        path: 'bvoAvailableMoney',
        component: () => import('@/views/bvo/bvo-wallet/bvo-available-money'),
        name: 'bvoAvailableMoney',
        hidden:true
      },
      {
        path: 'bvoTransactionRecord',
        component: () => import('@/views/bvo/bvo-wallet/bvo-transaction-record'),
        name: 'bvoTransactionRecord',
        hidden:true
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    meta: { title: 'Admin', icon: 'peoples'},
    children: [
      {
        path: 'code',
        component: () => import('@/views/admin/admin-code'),
        name: 'code',
        meta: { title: 'Code Manage', icon: 'form', affix: true }
      },
      {
        path: 'parameter',
        component: () => import('@/views/admin/admin-parameter'),
        name: 'storeManagement',
        meta: { title: 'Parameter Manage', icon: 'component', affix: true }
      },
      {
        path: 'withdraw',
        component: () => import('@/views/admin/admin-withdraw-aduit'),
        name: 'goodsHistory',
        meta: { title: 'Withdraw Aduit', icon: 'money', affix: true }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' },
  //               // hidden:true
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' },
  //               // hidden:true
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  //

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
