# JavaScript WASD Game
A simple JavaScript game which uses WASD to move a character

# Current Public Webpage

Live Video Game

* https://econtriver.github.io/JS_WASD_Game/

# Dependencies

To add new dependencies:

    npm install --save seedrandom -no-bin-links

# Build

    docker-compose run bash
    npm run build

# Ultraclean Build

    rm -rf dist node_modules package-lock.json
    npm install -no-bin-links