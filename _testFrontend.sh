#! /bin/bash

mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles './src/**/*.spec.js'