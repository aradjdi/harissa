module.exports = {
    module: {
        rules: [
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(css|scss|sass)$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.woff(\?\S*)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?\S*)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?\S*)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?\S*)?$/, use: 'file-loader' },
            { test: /\.svg(\?\S*)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.png$/, use: 'url-loader?mimetype=image/png' },
            { test: /\.jpg$/, use: 'url-loader?mimetype=image/jpg' },
            { test: /\.gif$/, use: 'file-loader' },
        ],
    },
};
