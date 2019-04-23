<template>

    <v-layout column>
        <v-flex align-self-center>
            <div class="headline">Products</div>
        </v-flex>
        <v-flex>
            <v-data-table
                    hide-actions
                    :headers="headers"
                    :items="$store.getters.getProducts"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.currency }}</td>
                    <td>{{ props.item.price }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                @click="addProductToBasket(props.item)"
                        >
                            add_shopping_cart
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>

</template>

<script>

    import App from '../js/app.js'

    export default {
        name: "Products",
        data() {
            return {
                headers: [
                    {text: 'Name', value: 'name'},
                    {text: 'Currency', value: 'currency'},
                    {text: 'Price', value: 'price'},
                    {text: 'Buy', value: 'buy'},
                ]
            }
        },
        methods: {
            addProductToBasket(product) {
                App.fillProduct(product);
                this.$store.commit('showProductDialog');
            }
        }
    }
</script>

<style scoped>

</style>