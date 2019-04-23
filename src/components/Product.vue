<template>
    <v-dialog
            v-model="showDialog"
            max-width="400"
            persistent
    >
        <v-card>
            <v-card-title class="headline primary white--text">
                {{productName}}
            </v-card-title>
            <v-card-text>
                <v-layout>
                    <v-flex xs12 sm4 md4>
                        <v-text-field
                                readonly
                                label="Price"
                                outline
                                :value="$store.state.product.price"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md3 ml-3>
                        <v-combobox
                                label="Currency"
                                color="primary"
                                :value="currency"
                                :items="$store.state.currency"
                                @change="changeCurrency($event)"
                        ></v-combobox>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm4 md4>
                        <v-text-field
                                label="Quantity"
                                outline
                                type="number"
                                min="1"
                                max="999"
                                :value="quantity"
                                @change="changeQuantity($event)"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 ml-3>
                        <v-text-field
                                readonly
                                label="Cost"
                                outline
                                :value="sum"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        flat="flat"
                        @click="resetProduct"
                >
                    Cancel
                </v-btn>

                <v-btn
                        color="deep-orange"
                        flat="flat"
                        @click="addProductToBasket"
                >
                    Add to basket
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import App from '../js/app'

    export default {
        name: "Product",
        computed: {
            showDialog: {
                get() {
                    return this.$store.state.product.show;
                },
                set(value) {
                    this.$store.commit('resetProduct');
                }
            },
            productName() {
                return this.$store.state.product.name;
            },
            currency() {
                return this.$store.state.product.currency
            },
            quantity() {
                return this.$store.state.product.quantity;
            },
            sum() {
                return this.$store.state.product.sum;
            }
        },
        methods: {
            changeCurrency(currency) {

                if (!currency) return;

                this.$store.commit('setToCurrency', currency);
                App.convertCurrency();
            },
            resetProduct() {
                this.$store.commit('resetProduct');
            },
            changeQuantity(quantity) {
                App.changeQuantity(quantity);
                this.$store.commit('recountProductSum');
            },
            addProductToBasket() {
                this.$store.commit('addProductToBasket');
                this.$store.commit('resetProduct');
            }
        }
    }
</script>

<style scoped>

</style>