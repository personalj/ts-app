// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  },

  configureWebpack: {
    resolve: {
      alias: {
        Assets: resolve("src/assets"),
        Components: resolve("src/components"),
        Router: resolve("src/router"),
        Store: resolve("src/store"),
        Views: resolve("src/views"),
      },
    },
  },
};
