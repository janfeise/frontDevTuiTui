const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'client', 'dist');

module.exports = {
    entry: entryFile,
    output: {
        path: outputDir,
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
        static: './client/dist',
        hot: true,
        proxy: [
            {
                context: ['/api', "/user"],
                target: 'https://6887-171-223-180-32.ngrok-free.app',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        ],
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client', 'dist', 'index.html'),
            filename: 'index.html',
            inject: false,
        }),
    ],
};
