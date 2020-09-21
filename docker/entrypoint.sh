#!/bin/sh
cd /app||exit 1
# Should be in a one command to prevent container from starting if something went wrong.
yarn install && yarn build-auto && yarn start