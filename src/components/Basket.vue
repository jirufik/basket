<template>

    <v-layout column>
        <v-flex align-self-center>
            <div class="headline">Basket</div>
        </v-flex>
        <v-flex>
            <v-data-table
                    hide-actions
                    :headers="headers"
                    :items="$store.getters.getBasket"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td @click="addProductToBasket(props.item)">{{ props.item.name }}</td>
                    <td @click="addProductToBasket(props.item)">{{ props.item.currency }}</td>
                    <td @click="addProductToBasket(props.item)">{{ props.item.price }}</td>
                    <td @click="addProductToBasket(props.item)">{{ props.item.quantity }}</td>
                    <td @click="addProductToBasket(props.item)">{{ props.item.sum }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                @click="delProductFromBasket(props.item)"
                        >
                            remove_shopping_cart
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <v-flex>
            <v-btn
                    color="primary"
                    flat="flat"
                    @click="calculate"
            >
                Calculate
            </v-btn>
        </v-flex>
        <v-flex pl-3 xs12 d-flex>
            <span class="headline">{{ strCalculate }}</span>
        </v-flex>
    </v-layout>

</template>

<script>

    import App from '../js/app.js'

    export default {
        name: "Basket",
        data() {
            return {
                headers: [
                    {text: 'Name', value: 'name'},
                    {text: 'Currency', value: 'currency'},
                    {text: 'Price', value: 'price'},
                    {text: 'Quantity', value: 'quantity'},
                    {text: 'Cost', value: 'sum'},
                    {text: 'Del', value: 'del'},
                ],
                strCalculate: 'Press calculate'
            }
        },
        methods: {
            addProductToBasket(product) {
                App.fillProduct(product);
                this.$store.commit('showProductDialog');
                this.strCalculate = 'Press calculate';
            },
            delProductFromBasket(product) {
                this.$store.commit('delProductFromBasket', product);
                this.strCalculate = 'Press calculate';
            },
            async calculate() {
                let res = await App.calculate();
                this.strCalculate = res;
            }
        }
    }
</script>

<style scoped>

</style>