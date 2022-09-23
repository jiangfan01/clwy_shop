import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/shop/ListView.vue";

import AdListView from "../views/AdCategory/ListView.vue";
import AdCreateView from "../views/AdCategory/AdcategoryView.vue";
import AdEditView from "../views/AdCategory/EditView.vue";

import ExpressesView from "../views/Expresses/ExpressesView.vue";
import NewExpressesView from "../views/Expresses/NewExpressesView.vue";
import EditExpressesView from "../views/Expresses/EditExpressesView.vue";

import AdsView from "../views/Ads/AdsView.vue";
import CreateAdsView from "../views/Ads/CreateAdsView.vue";
import EditAdsView from "../views/Ads/EditAdsView.vue";

import ArticlesListView from "../views/articles/ListView.vue";
import ArticlesEditView from "../views/articles/EditView.vue";
import ArticlesCreateView from "../views/articles/CreateView.vue";
import TrashView from "../views/articles/TrashView.vue";

import SettingView from "../views/setting/SettingView.vue";

import UserListView from "../views/users/ListView.vue";
import UserEditView from "../views/users/EditView.vue";
import UserCreateView from "../views/users/CreateView.vue";

import ShopListView from "../views/shop/ListView.vue";
import ShopEditView from "../views/shop/EditView.vue";
import ShopCreateView from "../views/shop/CreateView.vue";

import ProductListView from "../views/products/ListView.vue";
import ProductEditView from "../views/products/EditView.vue";
import ProductCreateView from "../views/products/CraeteView.vue";

import OrdersListView from "../views/orders/ListView.vue";
import OrdersShowView from "../views/orders/ShowView.vue";
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
    component: CategoryView,
  },
  {
    path: "/list",
    name: "AdList",
    component: AdListView,
  },
  {
    path: "/ads",
    name: "ads",
    component: AdsView,
  },
  {
    path: "/ads/create",
    name: "adsCreate",
    component: CreateAdsView,
  },
  {
    path: "/ads/edit/:id",
    name: "adsEdit",
    component: EditAdsView,
  },
  {
    path: "/create",
    name: "create",
    component: AdCreateView,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: AdEditView,
  },
  {
    path: "/expresses",
    name: "expresses",
    component: ExpressesView,
  },
  {
    path: "/expresses/create",
    name: "createExpresses",
    component: NewExpressesView,
  },
  {
    path: "/expresses/edit/:id",
    name: "editExpresses",
    component: EditExpressesView,
  },
  {
    path: "/articles/list",
    name: "articlesList",
    component: ArticlesListView,
  },
  {
    path: "/articles/edit/:id",
    name: "articlesEdit",
    component: ArticlesEditView,
  },
  {
    path: "/articles/create",
    name: "articlesCreate",
    component: ArticlesCreateView,
  },
  {
    path: "/articles/trash",
    name: "trash",
    component: TrashView,
  },
  {
    path: "/settings",
    name: "setting",
    component: SettingView,
  },
  {
    path: "/users",
    name: "usersList",
    component: UserListView,
  },
  {
    path: "/users/edit/:id",
    name: "usersEdit",
    component: UserEditView,
  },
  {
    path: "/users/create",
    name: "usersCreate",
    component: UserCreateView,
  },
  {
    path: "/shop",
    name: "shopList",
    component: ShopListView,
  },
  {
    path: "/shop/edit/:id",
    name: "shopEdit",
    component: ShopEditView,
  },
  {
    path: "/shop/create",
    name: "shopCreate",
    component: ShopCreateView,
  },
  {
    path: "/products",
    name: "productsList",
    component: ProductListView,
  },
  {
    path: "/products/edit/:id",
    name: "productsEdit",
    component: ProductEditView,
  },
  {
    path: "/products/create",
    name: "productsCreate",
    component: ProductCreateView,
  },
  {
    path: "/orders",
    name: "ordersList",
    component: OrdersListView,
  },
  {
    path: "/orders/show/:id",
    name: "ordersShow",
    component: OrdersShowView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
