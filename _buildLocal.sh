#! /bin/bash

#Clean out dist
rm -rf dist

#Build server
DEBUG=mymern* NODE_ENV=localprod ./node_modules/.bin/webpack --progress -p --colors --config ./webpacking/webpack.server.config.ts

#Build client with bundle analyzer triggered by `NODE_ENV=localprod`
DEBUG=mymern* NODE_ENV=localprod ./node_modules/.bin/webpack --progress -p --colors --config ./webpacking/webpack.webapp.config.ts

