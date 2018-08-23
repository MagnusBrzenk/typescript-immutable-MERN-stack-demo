// webpack.config.js
module.exports = {
    // entry: "./entry.js",
    entry: "./src/server/backend/specs/index.spec.ts",
    output: {
        path: __dirname,
        filename: "XXXbundle.js"
    },
    module: {
        rules: [
            ////////////////////////////////////
            // JS/TS FILE LOADERS:            //
            ////////////////////////////////////
            {
                test: /\.(js|ts)?$/,
                use: [
                    "mocha-loader",
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: [/node_modules/]
            }
        ]
    }
};
