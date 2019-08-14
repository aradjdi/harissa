module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /resources/],
                use: ['eslint-loader'],
            },
        ],
    },
};
