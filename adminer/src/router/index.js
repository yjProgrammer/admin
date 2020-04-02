import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

// 右侧主要显示内容页面及子路由配置
import NewsList from '../components/indexRight/newsAdmin/NewsList.vue'   //新闻列表
import AddNews from '../components/indexRight/newsAdmin/AddNews.vue'   //增加新闻
import AllSort from '../components/indexRight/sortAdmin/AllSort.vue'   //所有分类
import ResetPass from '../components/indexRight/resetPass'           //重置密码
import EditNews from '../components/indexRight/newsAdmin/EditNews.vue'  //编辑新闻
// import Talk from '../components/indexRight/talk/index.vue'      //编辑群聊
const indexRight = [{
    path: '/',
    name: 'NewsList',
    component: NewsList
  },
  {
    path: 'AddNews',
    name: 'AddNews',
    component: AddNews
  },
  {
    path: 'AllSort',
    name: 'AllSort',
    component: AllSort
  },
  {
    path: 'ResetPass',
    name: 'ResetPass',
    component: ResetPass
  },
  {
    path: 'EditNews',
    name: 'EditNews',
    component: EditNews
  }
  // {
  //   path: 'Talk',
  //   name: 'Talk',
  //   component: Talk
  // }

]

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    children: indexRight
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router