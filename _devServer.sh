#! /bin/bash

##################################################################################################
### Run this to get watched updating and running of server; run along with _devClient.sh
### NOTE: runs two indefinite processes simultaneously: nodemon and webpack --watch
### In theory, processes will be killed when you CTRL+C out of script execution,
### but is prone to mess up; if that happens, `killall node` normally cleans it up OK
##################################################################################################

DEBUG=mymern* NODE_ENV=development ./node_modules/.bin/webpack --colors --config ./webpacking/webpack.server.config.ts --mode development --watch &
nodemon dist/server.js