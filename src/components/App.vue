<template>
    <v-app light>
        <v-toolbar
                color="primary"
                fixed
        >
            <v-toolbar-title class="white--text">
                TEST BASKET
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat
                       color="white"
                       to="/products"
                >
                    <v-icon right>shop</v-icon>
                </v-btn>
                <v-btn flat
                       color="white"
                       to="/basket"
                >
                    <v-icon right>shopping_cart</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content style="padding: 58px 0px 45px 0px;">
            <router-view></router-view>
        </v-content>
        <product></product>
    </v-app>
</template>

<script>
    import Products from './Products.vue'
    import Product from './Product.vue'
    import Basket from './Basket.vue'

    export default {
        name: "app",
        components: {Products, Product, Basket},
    }
</script>

<style scoped>
</style>