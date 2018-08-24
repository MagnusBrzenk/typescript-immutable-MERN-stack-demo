#! /bin/bash

### Run all
### Make sure you don't have white space after the \ chars

mocha \
    -r babel-core/register \
    -r ./testing/helpers.js \
    -r ./testing/dom.js \
    -r ignore-styles './src/**/*.spec.js'