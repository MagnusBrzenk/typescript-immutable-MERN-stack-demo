#! /bin/bash

printf "\n======================================================\n"
printf   "BEGIN BUILDING"
printf "\n======================================================\n"

### Clean everything out
rm -rf dist

printf "\n======================================================\n"
printf   "FINISHED YARNING"
printf "\n======================================================\n"

### Build Backend
NODE_ENV=production ./node_modules/.bin/webpack --colors --progress -p --config ./webpacking/webpack.server.config.ts

printf "\n======================================================\n"
printf   "FINISHED WEBPACKING BACKEND"
printf "\n======================================================\n"

### Build Frontend
NODE_ENV=production ./node_modules/.bin/webpack --colors --progress -p --config ./webpacking/webpack.webapp.config.ts

printf "\n======================================================\n"
printf   "FINISHED WEBPACKING FRONTEND"
printf "\n======================================================\n"