import webpack from "webpack";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin/lib";
import nodeExternals from "webpack-node-externals";

///////////////////////////////////////////////////////////
// Webpack directives common to both front- and backend
///////////////////////////////////////////////////////////

export const commonWebpackConfig: webpack.Configuration = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".svg"],

        plugins: [
            (new TsconfigPathsPlugin({ configFile: "tsconfig.json" }) as any) as webpack.Plugin //Lets you use `paths` in tsconfig.json to generate aliases here in webpack; yay for DRY!
        ]
    },

    target: "node", //Bundle is NOT for running in browser

    externals: [nodeExternals()], //Don't bundle anything in node_modules; call them at runtime

    devtool: false,

    module: {
        loaders: [
            ////////////////////////////////////
            // JS/TS FILE LOADERS:            //
            ////////////////////////////////////
            {
                test: /\.(js|ts)?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: [path.join(__dirname, "node_modules")]
            }
        ]
    } as any,

    plugins: []
};
