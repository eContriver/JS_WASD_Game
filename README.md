# JavaScript WASD Game
A simple JavaScript game which uses WASD to move a character

# Current Public Webpage

Live Video Game

* https://econtriver.github.io/JS_WASD_Game/

# Dependencies - Build Image

To add new System dependencies:

    docker-compose build
    #?docker build -f infra/Dockerfile .

To add new NPM dependencies:

    npm install --save seedrandom -no-bin-links

To install all dependencies on a new system

    npm install -no-bin-links

# Build Source

    docker-compose run build
    #docker-compose run bash
    #npm run build
    ##npx webpack

# Test

    docker-compose run test
    #docker-compose run bash
    #npm run test
    ##TESTBUILD=true npx webpack
    ##npx mocha test-dist/main.js

# Run VS Code Dev

    docker-compose -f docker-compose.yaml -f .devcontainer/docker-compose.yml run dev

# Ultraclean Build

    rm -rf dist node_modules package-lock.json
    npm install -no-bin-links

# References

## Tools

Webpack
* https://webpack.js.org/concepts/#loaders

NPM
* https://docs.npmjs.com/about-npm

## Tutorials

Webpack with Mocha testing
* https://itnext.io/webpack-from-0-to-automated-testing-4634844d5c3c

## Examples

Uses seedrandom - also has a cool effect for loading pages etc.
* https://github.com/zsoltc/worley-noise

Info on esModuleInterop, allowSyntheticDefaultImports, and default property
* https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-fil