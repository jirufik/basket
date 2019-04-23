import store from '../store'

document.addEventListener('DOMContentLoaded', () => start());

function start() {

    fillProducts();

}

function fillProducts() {

    const products = [
        {
            name: 'Bike',
            currency: 'RUB',
            price: 1500.03
        },
        {
            name: 'Car',
            currency: 'RUB',
            price: 2700.44
        },
        {
            name: 'Bus',
            currency: 'RUB',
            price: 3532.11
        }
    ];

    store.commit('fillProducts', products);

}

function fillProduct(product) {

    let foundProduct = findProduct(product);

    if (!foundProduct) {
        foundProduct = {...product};
        foundProduct.quantity = 1;
        foundProduct.toCurrency = foundProduct.currency;
        foundProduct.sum = foundProduct.price * foundProduct.quantity;
        foundProduct.sum = round(foundProduct.sum, 2);
    }

    store.commit('fillProduct', foundProduct);

}

function findProduct(product) {

    let found = store.state.basket.find(el => el.name === product.name);

    if (found) {
        let foundProduct = {...found};
        return foundProduct;
    }

    return null;

}

function changeQuantity(quatity) {

    quatity = Number(quatity);
    if (quatity < 1) quatity = 1;
    store.commit('changeProductQuantity', quatity);
    store.commit('recountProductSum');

}

async function sendRequest({route, query}) {

    let strQuery = query;
    if (strQuery === 'product') {
        let product = store.state.product;
        strQuery = `products=${JSON.stringify([product])}`;
    } else if (strQuery === 'basket') {
        strQuery = `products=${JSON.stringify(store.state.basket)}`;
    }

    let url = `http://${window.location.host}${route}?${strQuery}`;
    let res = await fetch(url);

    if (res.status !== 200) return false;
    let obj = await res.json();

    return obj;

}

async function convertCurrency() {

    let res = {};
    if (store.state.product.toCurrency === 'RUB') {
        res = await convertToRUB();
    } else {
        res = await sendRequest({route: '/products', query: 'product'});
    }

    await store.dispatch('convertCurrencyProduct', res);

}

async function convertToRUB() {

    const products = store.state.products;
    const product = products.find(el => el.name === store.state.product.name);
    let sum = store.state.product.quantity * product.price;

    let res = {
        convertPrice: product.price,
        sum
    };

    return res;

}

async function calculate() {
    let res = await sendRequest({route: '/baskets', query: 'basket'});
    return res;
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export default {
    fillProduct,
    changeQuantity,
    convertCurrency,
    calculate,
    round
}