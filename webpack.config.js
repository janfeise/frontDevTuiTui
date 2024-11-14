const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

module.exports = {
    entry: entryFile,  // 入口文件
    output: {
        path: outputDir,  // 输出目录
        publicPath: "/",  // 公共路径
        filename: "bundle.js",  // 输出的文件名
    },
    module: {
        rules: [
            // 处理图片
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                    name: '[path][name].[ext]', // 保持原有的文件名
                    },
                },
                ],
            },
            {
                test: /\.(js|jsx)$/,  // 匹配 JavaScript 和 JSX 文件
                exclude: /node_modules/,  // 排除 node_modules 文件夹
                use: {
                    loader: "babel-loader",  // 使用 Babel loader
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],  // Babel 预设
                    },
                },
            },
            {
                test: /\.css$/,  // 处理 CSS 文件
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // 解析文件扩展名
    },
    devServer: {
        historyApiFallback: true,
        static: './client/dist',
        hot: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://47.109.186.111:8088',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        ],
        port: 3000,
    },
    mode: 'development',  // 开发模式
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client', 'dist', 'index.html'),  // 保留现有的 index.html 作为模板
            inject: false,  // 不自动插入脚本标签
        }),
    ],
};
