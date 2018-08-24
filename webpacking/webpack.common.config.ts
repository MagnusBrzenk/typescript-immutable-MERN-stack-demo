import webpack from "webpack";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin/lib";

///////////////////////////////////////////////////////////
// Webpack directives common to both front- and backend
///////////////////////////////////////////////////////////

export const commonWebpackConfig: webpack.Configuration = {
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".svg"],

        plugins: [
            (new TsconfigPathsPlugin({ configFile: "tsconfig.json" }) as any) as webpack.Plugin //Lets you use `paths` in tsconfig.json to generate aliases here in webpack; yay for DRY!
        ]
    },

    module: {
        rules: [
            // MINOR FILE LOADERS:
            { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ },
            { test: /\.txt$/, loader: "raw-loader", exclude: /node_modules/ },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.csv$/,
                loader: "csv-loader",
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
    ]
};
