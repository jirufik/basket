import Vue from 'vue'
import VueRouter from 'vue-router'
import Basket from '../components/Basket'
import Products from '../components/Products'

Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {path: '/', component: Products},
        {path: '/products', component: Products},
        {path: '/basket', component: Basket}
    ]
});