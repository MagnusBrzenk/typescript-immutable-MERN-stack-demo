import webpack from "webpack";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin/lib";

///////////////////////////////////////////////////////////
// Webpack directives common to both front- and backend
///////////////////////////////////////////////////////////

console.log("########################################################");
console.log("Running webpack.common.config.ts from: ", __dirname);
console.log("__BACKEND: ", path.resolve(__dirname, "..", "src", "server", "backend/"));
console.log("########################################################");

export const commonWebpackConfig: webpack.Configuration = {
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".svg"],

        // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
        // Unfortunately, `tsconfig-paths-webpack-plugin` doesn't work when deployed to heroku so,
        // for now at least, we'll have to disable it and simply copy-paste-edit the aliases defined in
        // tsconfig.json to webpack aliases (like an idiot)
        // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
        // plugins: [
        //     (new TsconfigPathsPlugin({ configFile: "tsconfig.json" }) as any) as webpack.Plugin //Lets you use `paths` in tsconfig.json to generate aliases here in webpack; yay for DRY!
        // ]
        // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
        alias: {
            __BACKEND: path.resolve(__dirname, "..", "src", "server", "backend/"),
            __COMPONENTS: path.resolve(__dirname, "..", "src", "webapp", "Components/"),
            __CONSTANTS: path.resolve(__dirname, "..", "src", "common", "constants"),
            __CONTAINERS: path.resolve(__dirname, "..", "src", "webapp", "Containers/"),
            __FUNCTIONS: path.resolve(__dirname, "..", "src", "common", "functions/"),
            __MODELS: path.resolve(__dirname, "..", "src", "common", "models"),
            __METATYPING: path.resolve(__dirname, "..", "src", "common", "models", "metatyping"),
            __REDUX: path.resolve(__dirname, "..", "src", "webapp", "Redux/"),
            __RESOURCES: path.resolve(__dirname, "..", "resources/"),
            __SERVER: path.resolve(__dirname, "..", "src", "server"),
            __UTILS: path.resolve(__dirname, "..", "src", "webapp", "Utils")
        }

        // "__BACKEND/*": ["server/backend/*"],
        // "__COMPONENTS/*": ["webapp/Components/*"],
        // "__CONSTANTS":["common/constants/index"],
        // "__CONTAINERS/*": ["webapp/Containers/*"],
        // "__CONTEXTS/*": ["webapp/Contexts/*"],
        // "__UTILS/*":["webapp/Utils/*"],
        // "__FUNCTIONS/*":["common/functions/*"],
        // "__METATYPING": ["common/models/metatyping/index"],
        // "__MODELS": ["common/models/index"],
        // "__REDUX/*":["webapp/Redux/*"],
        // "__RESOURCES/*":["../resources/*"],
        // "__SERVER/*":["server/*"]
        // -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
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
