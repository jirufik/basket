const https = require('https');
const url = require('url');
const arrCurrency = ['RUB', 'EUR', 'USD'];

async function calculate(req) {

    const rates = await getExchangeRates();
    const products = await getProductsFromUrl(req.url);
    const total = await calculateProducts({products, rates});

    return total;

}

async function convertCurrencyByProduct(req) {

    const rates = await getExchangeRates();
    const products = await getProductsFromUrl(req.url);
    if (!products.length) return false;

    let product = products[0];
    let res = await calculateProductByCurrency({
        product,
        currency: product.toCurrency,
        rates
    });

    return res;

}

async function calculateProducts({products, rates}) {

    const total = await createTotal();

    for (let currency of arrCurrency) {

        for (let product of products) {

            let res = await calculateProductByCurrency({product, currency, rates});
            total[currency] += res.sum;

        }

        total[currency] = await round(total[currency], 2);

    }

    return total;

}

async function createTotal() {

    let total = {};

    for (let currency of arrCurrency) {
        total[currency] = 0;
    }

    return total;

}

async function calculateProductByCurrency({product, currency, rates}) {

    if (!product.currency) return 0.00;
    if (!product.price || product.currency < 0) return 0.00;
    if (!product.quantity || product.currency < 0) return 0.00;

    const convertPrice = await convert({
        price: product.price,
        fromCurrency: product.currency,
        toCurrency: currency,
        rates
    });

    let sum = convertPrice * product.quantity;
    sum = await round(sum, 2);

    return {convertPrice, sum};

}

async function convert({price, fromCurrency, toCurrency, rates}) {

    if (fromCurrency.toUpperCase() === toCurrency.toUpperCase()) return price;

    let convertPrice = 0.00;
    let currencyRUB = await getRateByCurrency({currency: fromCurrency, rates});
    let priceRUB = price * currencyRUB;
    priceRUB = await round(priceRUB, 2);
    currencyRUB = await getRateByCurrency({currency: toCurrency, rates});
    convertPrice = priceRUB / currencyRUB;
    convertPrice = await round(convertPrice, 2);

    return convertPrice;

}

async function getRateByCurrency({currency, rates}) {

    if (!rates.Valute[currency.toUpperCase()]) return 1.00;

    return rates.Valute[currency.toUpperCase()].Value;

}

function getExchangeRates() {

    return new Promise(resolve => {

        https.get('https://www.cbr-xml-daily.ru/daily_json.js', (res) => {

            const {statusCode} = res;

            if (statusCode !== 200) {
                resolve(false);
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rates = '';

            res.on('data', (chunk) => {
                rates += chunk;
            });

            res.on('end', () => {
                try {
                    rates = JSON.parse(rates);
                    resolve(rates);
                } catch (e) {
                    resolve(false);
                }
            });

        }).on('error', (e) => {
            resolve(false);
        });
    });
}

async function getProductsFromUrl(strUrl) {

    let urlParts = url.parse(strUrl, true);
    let products = urlParts.query.products;

    if (!products) {
        return [];
    }

    try {
        return JSON.parse(products);
    } catch (e) {
        return [];
    }

}

///Pomny chto v JS s okrugleniyami vozmojni focusi
///Poetomu ispoljzoval reshenie s habra https://habr.com/ru/post/312880/#s2
async function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

module.exports = {
    calculate,
    convertCurrencyByProduct
};