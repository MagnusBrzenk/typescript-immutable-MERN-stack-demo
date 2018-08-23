//Webpack config common to both client and server:
import { commonWebpackConfig } from "./webpack.common.config";

//Webpack plugins:
import HtmlWebpackPlugin from "html-webpack-plugin";
// import OpenBrowserPlugin from "open-browser-webpack-plugin";
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

//Misc imports:
import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";

//Configuration Params:
const bIsProduction: boolean = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "localprod";
const bRemoveComments: boolean = true;
const tsLoader: string = true ? "ts-loader" : "awesome-typescript-loader";

///////////////////////////////////////////////////
// Webpack directives for frontend build and dev //
///////////////////////////////////////////////////

const clientWebpackConfig: webpack.Configuration = {
    entry: !!bIsProduction
        ? [path.resolve("src", "webapp", "AppEntry", "index.tsx")]
        : [
              "webpack-dev-server/client?http://localhost:3000",
              "webpack/hot/only-dev-server",
              path.resolve("src", "webapp", "AppEntry", "index.tsx")
          ],

    output: {
        path: path.resolve("dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[chunkhash].js", //See optimization below and following link for what chunks are all about: https://survivejs.com/webpack/building/bundle-splitting/
        publicPath: "/"
    },

    target: "web", //Build for web environment; see: https://webpack.js.org/concepts/targets/

    devServer: {
        hot: true,
        contentBase: [path.resolve("resources", "images"), path.resolve("dist")],
        publicPath: "http://localhost:3000/",
        historyApiFallback: {
            disableDotRule: true
        },
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            },
            "/images": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            },
            "/scripts": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            },
            "/styles": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            },
            "/data": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            },
            "/uploadimages": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            }
        }
    },
    module: {
        rules: [
            ////////////////////////////////////
            // JS/TS FILE LOADERS:            //
            ////////////////////////////////////

            {
                test: /\.(js|jsx|ts|tsx)?$/,
                use: bIsProduction
                    ? [
                          "babel-loader",
                          {
                              loader: tsLoader,
                              options: {
                                  transpileOnly: !!bIsProduction
                              }
                          }
                      ] //Exclude hot-loading in production
                    : [
                          "babel-loader?plugins=react-hot-loader/babel",
                          "babel-loader",
                          {
                              loader: tsLoader,
                              options: {
                                  transpileOnly: !!bIsProduction
                              }
                          }
                      ],
                exclude: [/node_modules/]
            },

            ////////////////////////////////////
            // STYLE LOADERS: CSS, SCSS, LESS //
            ////////////////////////////////////

            //GLOBAL STYLES; Loaders for globally applicable styles:
            //Global CSS
            {
                test: /global\.css$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        query: {
                            modules: false,
                            sourceMap: !bIsProduction,
                            importLoaders: 0,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    }
                ]
            },
            //Global LESS
            {
                test: /global\.less$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        query: {
                            modules: false,
                            sourceMap: !bIsProduction,
                            importLoaders: 1,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    },
                    "less-loader"
                ]
            },
            //Global SASS
            {
                test: /global\.scss$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        query: {
                            modules: false,
                            sourceMap: !bIsProduction,
                            importLoaders: 1,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    },
                    "sass-loader"
                ]
            },
            //LOCAL STYLES; Loaders for locally applicable css-modules:
            //Local CSS Modules
            {
                test: /\.css$/,
                exclude: /global\.css$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            sourceMap: !bIsProduction,
                            importLoaders: 0,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    }
                ]
            },
            //Local LESS modules
            {
                test: /\.less$/,
                exclude: /global\.less$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    // "css-loader",
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            sourceMap: !bIsProduction,
                            importLoaders: 1,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    },
                    "less-loader"
                ]
            },
            //Local SASS Modules
            {
                test: /\.(sass|scss)$/,
                exclude: /global\.(sass|scss)$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            sourceMap: !bIsProduction,
                            importLoaders: 1,
                            localIdentName: "[local]__[hash:base64:5]"
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },

    /////////////////////////////////////
    // WEBPACK PLUGINS                 //
    /////////////////////////////////////

    plugins: ([
        //Used to extract all css from bundle and place in external .css file
        new MiniCssExtractPlugin({ filename: "[name].css" }),

        // Plugin to inject react <script> into html file to be copied over to `output.path`
        new HtmlWebpackPlugin({
            template: path.resolve("resources", "index.html"),
            title: "Caching"
        }),

        //Open app in browser once compiled
        new OpenBrowserPlugin({
            url: "http://localhost:3000",
            browser: "Google Chrome"
        }),
        process.env.NODE_ENV === "localprod" ? new BundleAnalyzerPlugin.BundleAnalyzerPlugin() : undefined
    ].filter((plugin): boolean => !!plugin) as any) as webpack.Plugin[],

    /////////////////////////////////////
    // OPTIMIZATION                    //
    /////////////////////////////////////
    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 20
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -10
                }
            }
        },
        runtimeChunk: true,
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Need to override default uglifyjs minimizer because of safari10 bug;
        // See e.g.: https://air.ghost.io/transforming-async-await-js-and-minifying-using-uglify/
        ///////////////////////////////////////////////////////////////////////////////////////////
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    // ecma: 8,
                    warnings: false,
                    mangle: {
                        safari10: true
                    },
                    output: {
                        comments: bRemoveComments ? false : /^\**!|@preserve|@license|@cc_on/,
                        beautify: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                    compress: !!bIsProduction
                }
            } as any)
        ]
    }
};

export default merge(commonWebpackConfig, clientWebpackConfig);
