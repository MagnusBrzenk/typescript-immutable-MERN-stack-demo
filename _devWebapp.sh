#! /bin/bash

###########################################################################################
### Run this to get HMR when you're developing front-end; run along with _devServer.sh  ###
###########################################################################################

DEBUG=true NODE_ENV=development ./node_modules/.bin/webpack-dev-server --mode development --hot --progress --watch --color --port 3000 --config webpacking/webpack.webapp.config.ts