import Vue from 'vue'
import Vuex from 'vuex'
import App from '../js/app'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        langEn: true,
        products: [],
        basket: [],
        product: {
            name: '',
            currency: '',
            toCurrency: '',
            price: 0.00,
            quantity: 0,
            sum: 0.00,
            show: false
        },
        currency: ['RUB', 'EUR', 'USD']
    },
    getters: {
        getProducts: state => state.products,
        getBasket: state => state.basket
    },
    mutations: {
        changeLang(state) {
            state.langEn = !state.langEn;
        },
        fillProducts(state, products) {
            state.products = products;
        },
        showProductDialog(state) {
            state.product.show = true;
        },
        hideProductDialog(state) {
            state.product.show = false;
        },
        changeProductQuantity(state, quantity) {
            state.product.quantity = quantity;
        },
        recountProductSum(state) {
            let sum = state.product.price * state.product.quantity;
            sum = App.round(sum, 2);
            state.product.sum = sum;
        },
        setToCurrency(state, currency) {
            state.product.toCurrency = currency;
        },
        resetProduct(state) {
            state.product = {
                name: '',
                currency: '',
                toCurrency: '',
                price: 0.00,
                quantity: 0,
                sum: 0.00,
                show: false
            }
        },
        convertCurrencyProduct(state, value) {
            state.product.currency = state.product.toCurrency;
            state.product.price = value.convertPrice;
            state.product.sum = value.sum;
        },
        fillProduct(state, product) {
            state.product = product;
        },
        addProductToBasket(state) {

            let foundProduct = state.basket.find(el => el.name === state.product.name);
            let addProduct = {...state.product};
            delete addProduct.show;

            if (!foundProduct) {
                state.basket.push(addProduct);
            } else {
                for (let name in foundProduct) {
                    foundProduct[name] = addProduct[name];
                }
            }

        },
        delProductFromBasket(state, product) {
            const index = state.basket.findIndex(el => el.name === product.name);
            if (index < 0) return;
            state.basket.splice(index, 1);
        }
    },
    actions: {
        async convertCurrencyProduct({commit}, value) {
            commit('convertCurrencyProduct', value);
        },
        async changeLang({commit}) {
            commit('changeLang');
        }
    }
});