# BASKET

## Описание
Тестовое задание. Имеется список товаров. Товары добавляются 
в карзину. У товаров можно изменять количество и валюту. Цена должна
автоматически конвертироваться и расчитываться стоимость в новой
валюте. Каждый товар може иметь свою валюту.

В корзине товар можно редактировать. В корзине должна быть кнопка 
**Calculate** при нажатии которой отправляется запрос серверу с
содержимым корзины, в ответ от сервера приходит **json** содержащий
общую стоимость всех товаров в валютах: *RUB*, *EUR*, *USD*.

**Фронтенд** - можно использовать что угодно

**Бэкенд** - использовать Express

**Курс валют** - брать здесь https://www.cbr-xml-daily.ru/daily_json.js

## Настройка
Конфигурационный файл находится в `./config/index.js` в котором
можно настроить порт на котором будет работать сервер в `production`
или `development` режиме. 

По умолчанию `production` работает на порту `8080`, а `development`
на порту `4040`

## Запуск 
Для запуска в режиме `development` 

- Собираем фронтенд `npm run dev`
- Запускаем бэкенд `npm run startdev`
- В браузере `http://localhost:4040` 

Для запуска в режиме `production` 

- Собираем фронтенд `npm run build`
- Запускаем бэкенд `npm run startprod`
- В браузере `http://localhost:8080`

## Фронтенд
Для фронтенда использовались:

- Vue
- Vuetify
- Vuex
- Vue-router
- Webpack 

## Бэкенд
Для бэкенда использовались:

- Nodejs
- Express

## API

### products
Конвертирует валюту по выбранному товару, возвращает цену и стоимость 
в новой валюте.

| Path | Method | Query |
|---|---|---|
|/products|GET|products|

**products** - массив который должен содержать объект товара, если
в массиве больше одного товара, конвертирован будет первый.

| Name | Type | Description |
|---|---|---|
|name|string|наименование товара|
|currency|string|текущая валюта товара|
|price|number|цена товара в текущей валюте|
|quantity|number|количество едениц товара|
|toCurrency|string|валюта в которую необходимо конвертировать|

**Пример**
http://localhost:4040/products?products=[{%22name%22:%22Bike%22,%22currency%22:%22RUB%22,%22price%22:1500.03,%22quantity%22:1,%22toCurrency%22:%22EUR%22}]

В ответ придет **json**
```js
{"convertPrice":20.91,"sum":20.91}
```

| Name | Type | Description |
|---|---|---|
|convertPrice|number|цена товара в новой валюте|
|sum|number|стоимость товара в новой валюте|

### baskets
Возвращает общую стоимость товаров в корзине в валютах: *RUB*, *EUR*, *USD*.

| Path | Method | Query |
|---|---|---|
|/baskets|GET|products|

**products** - массив который должен содержит объекты товаров.

| Name | Type | Description |
|---|---|---|
|name|string|наименование товара|
|currency|string|текущая валюта товара|
|price|number|цена товара в текущей валюте|
|quantity|number|количество едениц товара|

**Пример**
http://localhost:4040/baskets?products=[{%22name%22:%22Bike%22,%22currency%22:%22EUR%22,%22price%22:20.91,%22quantity%22:3},{%22name%22:%22Car%22,%22currency%22:%22RUB%22,%22price%22:2700.44,%22quantity%22:1}]

В ответ придет **json**
```js
{"RUB":7201.01,"EUR":100.37,"USD":112.89}
```

| Name | Type | Description |
|---|---|---|
|RUB|number|общая стоимость товаров в корзине в рублях|
|EUR|number|общая стоимость товаров в корзине в евро|
|USD|number|общая стоимость товаров в корзине в долларах|
