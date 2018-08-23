#! /bin/bash

# slow: parameterize what test counts as 'slow'

# mocha --require babel-core/register --slow 100 --timeout 10000 --compilers ts:ts-node/register ./src/server/backend/specs/index.spec.ts

# ./node_modules/mocha-webpack/bin/mocha-webpack --require ts-node/register --webpack-config ./test/webpack.test-backend.config.ts ./src/server/backend/specs/index.spec.ts

./node_modules/mocha-webpack/bin/mocha-webpack --webpack-config ./test/webpack.test-backend.config.ts ./src/server/backend/specs/index.spec.ts