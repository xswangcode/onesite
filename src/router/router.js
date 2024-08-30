import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import home from "../views/home/index.vue";
import login from "../views/login/index.vue";
import Layout from "../layout/index.vue";

const routes = [{
    path: "/login",
    name: login,
    component: login,
  },
  {
    path: "/",
    component: Layout,
    name: "container",
    redirect: "home",
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "首页",
    },
    children: [{
      path: "/home",
      name: "home",
      component: () => import("../views/home/index.vue"),
      meta: {
        requiresAuth: true, //有一些页面是否登录才能进去
        name: "首页",
      },
    }, ],
  }, 
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: {
      name: "系统管理",
    },
    children: [{
        path: "/Department",
        name: "Department",
        component: () => import("../views/system/Department/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "机构管理",
        },
      },
      {
        path: "/UserList",
        name: "UserList",
        component: () => import("../views/system/UserList/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "内嵌表格",
        },
      },
      {
        path: "/RoleList",
        name: "RoleList",
        component: () => import("../views/system/RoleList/index.vue"),
        meta: {
          requiresAuth: true,
          name: "滑动加载",
        },
      },
      {
        path: "/MenuList",
        name: "MenuList",
        component: () => import("../views/system/MenuList/index.vue"),
        meta: {
          requiresAuth: true,
          name: "可编辑Table",
        },
      },
      {
        path: "/importExcel",
        name: "importExcel",
        component: () => import("../views/system/Excel/importExcel.vue"),
        meta: {
          requiresAuth: true,
          name: "Excel",
        },
      },
    ],
  }, 
  {
    path: "/video",
    name: "video",
    component: Layout,
    meta: {
      name: "视频播放器",
    },
    children: [{
      path: "/video",
      name: "video",
      component: () => import("../views/video/index.vue"),
      meta: {
        requiresAuth: true,
        name: "视频播放器",
      },
    }, ],
  },   
  {
    path: "/self",
    name: "self",
    component: Layout,
    meta: {
      name: "个人开发",
    },
    children:[
      {
        path: "/flex-layout",
        name: "flex-layout",
        component:  () => import("../views/preview/index.vue"),
        meta: {
          name: "flex-布局",
        },
      },
      {
        path: "/video-preview",
        name: "video-preview",
        component:  () => import("../views/preview/OnlinePreview.vue"),
        meta: {
          name: "在线预览",
        },
      },
      {
        path: "/list-localfile",
        name: "list-localfile",
        component:  () => import("../views/preview/localVideoList.vue"),
        meta: {
          name: "本地列表",
        },
      },
      {
        path: "/list-localfile2",
        name: "OnlinePreview2",
        component:  () => import("../views/preview/OnlineRebuild.vue"),
        meta: {
          name: "在线预览-重构",
        },
      },
    ]
  }, 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;