const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/entry",
  mode: "development",
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "HomeApp",
      remotes: {
        HeaderApp: "HeaderApp@http://localhost:3001/remoteEntry.js",
        FooterApp: "FooterApp@http://localhost:4200/remoteEntry.js",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: "auto",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "auto",
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
