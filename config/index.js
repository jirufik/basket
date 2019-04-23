let production = {
    PORT: 8080
};

let development = {
    PORT: 4040
};

module.exports = (() => {
    if (process.env.NODE_ENV === 'production') {
        return production;
    }
    return development;
})();