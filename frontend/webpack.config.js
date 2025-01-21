export const mode = 'development';
export const devtool = 'source-map';
module.exports = {
    // Your config
    plugins: [
      new ReactRefreshWebpackPlugin(),
      // Other plugins
    ],
  };