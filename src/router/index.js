import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../views/shop/ListView.vue"),
  },
  {
    path: "/list",
    name: "AdList",
    component: () => import("../views/AdCategory/ListView.vue"),
  },
  {
    path: "/ads",
    name: "ads",
    component: () => import("../views/Ads/AdsView.vue"),
  },
  {
    path: "/ads/create",
    name: "adsCreate",
    component: () => import("../views/Ads/AdsView.vue"),
  },
  {
    path: "/ads/edit/:id",
    name: "adsEdit",
    component: () => import("../views/Ads/EditAdsView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/AdCategory/AdcategoryView.vue"),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../views/AdCategory/EditView.vue"),
  },
  {
    path: "/expresses",
    name: "expresses",
    component: () => import("../views/Expresses/ExpressesView.vue"),
  },
  {
    path: "/expresses/create",
    name: "createExpresses",
    component: () => import("../views/Expresses/NewExpressesView.vue"),
  },
  {
    path: "/expresses/edit/:id",
    name: "editExpresses",
    component: () => import("../views/Expresses/EditExpressesView.vue"),
  },
  {
    path: "/articles/list",
    name: "articlesList",
    component: () => import("../views/articles/ListView.vue"),
  },
  {
    path: "/articles/trash",
    name: "trash",
    component: () => import("../views/articles/TrashView.vue"),
  },
  {
    path: "/settings",
    name: "setting",
    component: () => import("../views/setting/SettingView.vue"),
  },
  {
    path: "/users",
    name: "usersList",
    component: () => import("../views/users/ListView.vue"),
  },
  {
    path: "/users/edit/:id",
    name: "usersEdit",
    component: () => import("../views/users/EditView.vue"),
  },
  {
    path: "/users/create",
    name: "usersCreate",
    component: () => import("../views/users/CreateView.vue"),
  },
  {
    path: "/shop",
    name: "shopList",
    component: () => import("../views/shop/ListView.vue"),
  },
  {
    path: "/shop/edit/:id",
    name: "shopEdit",
    component: () => import("../views/shop/EditView.vue"),
  },
  {
    path: "/shop/create",
    name: "shopCreate",
    component: () => import("../views/shop/CreateView.vue"),
  },
  {
    path: "/products",
    name: "productsList",
    component: () => import("../views/products/ListView.vue"),
  },
  {
    path: "/products/edit/:id",
    name: "productsEdit",
    component: () => import("../views/products/EditView.vue"),
  },
  {
    path: "/products/create",
    name: "productsCreate",
    component: () => import("../views/products/CraeteView.vue"),
  },
  {
    path: "/orders",
    name: "ordersList",
    component: () => import("../views/orders/ListView.vue"),
  },
  {
    path: "/orders/show/:id",
    name: "ordersShow",
    component: () => import("../views/orders/ShowView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
