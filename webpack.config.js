const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

module.exports = {
    entry: entryFile, // 入口文件
    output: {
        path: outputDir, // 输出目录
        publicPath: "/", // 使用绝对路径以支持前端路由
        filename: "bundle.js", // 输出的文件名
    },
    module: {
        rules: [
            // 处理图片
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]", // 保持原有的文件名
                        },
                    },
                ],
            },
            // 处理 JavaScript 和 JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            // 处理 CSS 文件
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"], // 解析文件扩展名
    },
    devServer: {
        historyApiFallback: true, // 确保路由回退到 index.html
        static: path.resolve(__dirname, "client", "dist"), // 指向静态文件目录
        hot: true, // 开启模块热替换
        proxy: {
            "/user/login": {
                target: "https://60d5-117-174-11-178.ngrok-free.app", // 添加协议，确保代理格式正确
                changeOrigin: true,
            },
        },
        port: 3000, // 开发服务器端口
    },
    mode: "development", // 开发模式
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "client", "dist", "index.html"), // 指向 dist 文件夹中的 index.html
            inject: true, // 自动插入脚本标签
        }),
    ],
};
