const express = require('express');
let app = express();
const middleware = require('./middleware');
const config = require('./config');

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products', (req, res) => {

    Promise.resolve()
        .then(() => middleware.convertCurrencyByProduct(req))
        .then(product => res.send(product))
        .catch((e) => {
            res.status(500).send('Error');
            console.log(e);
        });

});

app.get('/baskets', (req, res) => {

    Promise.resolve()
        .then(() => middleware.calculate(req))
        .then(total => res.send(total))
        .catch((e) => {
            res.status(500).send('Error');
            console.log(e);
        });

});

app.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}!`);
});