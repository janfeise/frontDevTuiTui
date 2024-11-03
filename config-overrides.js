const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  const indexHtmlPluginIndex = config.plugins.findIndex(
    (plugin) => plugin instanceof HtmlWebpackPlugin
  );

  if (indexHtmlPluginIndex !== -1) {
    config.plugins[indexHtmlPluginIndex] = new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/dist/index.html'), // 确保路径正确
    });
  }

  return config;
};
