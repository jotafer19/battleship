import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./src",
  },
  optimization: {
    runtimeChunk: "single",
  },
};

export default merge(commonConfig, devConfig);
