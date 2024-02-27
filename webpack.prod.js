import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

const prodConfig = {
  mode: "production",
  devtool: "source-map",
};

export default merge(commonConfig, prodConfig);
