#! /bin/bash


mocha \
    --timeout 10000 \
    --slow 100 \
    --compilers ts:ts-node/register \
    -r tsconfig-paths/register \
    ./src/server/backend/specs/index.spec.ts

    # --require babel-core/register \


# ./node_modules/mocha-webpack/bin/mocha-webpack --require ts-node/register --webpack-config ./test/webpack.test-backend.config.ts ./src/server/backend/specs/index.spec.ts

# ./node_modules/mocha-webpack/bin/mocha-webpack --webpack-config ./test/webpack.test-backend.config.ts ./src/server/backend/specs/index.spec.ts

# './src/**/*.spec.js'

