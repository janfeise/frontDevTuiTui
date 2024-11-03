const path = require("path");

const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

module.exports = {
    entry: [entryFile],
    output: {
        path: outputDir,
        publicPath: "/",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 匹配 JavaScript 和 JSX 文件
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // 使用 Babel loader
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // 添加预设
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // 解析文件扩展名
    },
    devServer: {
        historyApiFallback: true,
        static: "./client/dist",
        hot: true,
        proxy: {
          "/api": "http://localhost:3000",
        },
      },
    mode: 'development',
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // 其他配置
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/dist/index.html'), // 确保路径正确
    }),
  ],
};

