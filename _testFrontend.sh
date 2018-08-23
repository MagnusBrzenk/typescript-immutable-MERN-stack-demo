#! /bin/bash

### Make sure you don't have white space after the \ chars

mocha \
    -r babel-core/register \
    -r ./test/helpers.js \
    -r ./test/dom.js \
    -r ignore-styles './src/**/*.spec.js'