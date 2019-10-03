var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './client/src/polyfills.ts',
        'vendor': './client/src/vendor.ts',
        'theme-scripts': './client/src/theme-scripts.ts',
        'app': './client/src/main.ts',
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'imports?jQuery=jquery,JQuery=jquery,$=jquery']
            },
            // {
            //     test: /\.css$/,
            //     loaders: ['to-string-loader', 'css-loader']
            // },
            {
                test: /^(?!.*component).*\.scss$/,
                loaders: ['to-string-loader', "style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('client/src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('client/src', 'app'),
                loader: 'raw'
            },
            {
                test: /bootstrap.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,JQuery=jquery,$=jquery,this=>window'
            },
            {
                test: /fitvids.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,JQuery=jquery,$=jquery,this=>window'
            },
            {
                test: /modernizr.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,JQuery=jquery,$=jquery,this=>window'
            },
            //{
            //    test: /(main\.ts)$/,
            //    loader: 'imports?jQuery=jquery,$=jquery'
            //}
        ],
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre'
    },

    plugins: [

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            JQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "window.jQuery": "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'client/src/index.html'
        })
    ]
};
