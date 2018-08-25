//Webpack config common to both client and server:
import { commonWebpackConfig } from "./webpack.common.config";

//Misc imports:
import nodeExternals from "webpack-node-externals";
import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";

const bIsProduction: boolean = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "localprod";

///////////////////////////////////////////////////////////
// Webpack directives for backend build
///////////////////////////////////////////////////////////

const serverWebpackConfig: webpack.Configuration = {
    entry: [path.resolve("src", "server", "index.ts")],

    output: {
        path: path.resolve("dist"),
        filename: "server.js"
    },

    target: "node", //Bundle is NOT for running in browser

    externals: [nodeExternals()], //Don't bundle anything in node_modules; call them at runtime

    devtool: false,

    module: {
        rules: [
            ////////////////////////////////////
            // JS/TS FILE LOADERS:            //
            ////////////////////////////////////
            {
                test: /\.(js|ts)?$/,
                use: [
                    // "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: !!bIsProduction
                        }
                    }
                ],
                exclude: [path.join(__dirname, "node_modules")]
            }
        ]
    },

    optimization: {
        minimize: false
    },

    /////////////////////////////////////
    // WEBPACK PLUGINS                 //
    /////////////////////////////////////

    plugins: []
};

export default merge(commonWebpackConfig, serverWebpackConfig);
