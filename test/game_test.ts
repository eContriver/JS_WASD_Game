// Copyright (c) 2021 eContriver LLC

// <reference path="../src/game.ts" />

import { Asset } from '../src/Asset';
import { DefaultAsset } from '../src/DefaultAsset';

class TestRunner {
    runTests() {
        let t: Asset = new DefaultAsset("test.js");
        t.onLoad(function(event: any) {
            const result = event.target.result;
            console.log(`Result: ${result}`);
        });
        t.onProgress(function(event: any) {
            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Progress: ${Math.round(percent)}`);
            }
        });
    }
}

function test() {
    let testRunner = new TestRunner();
    testRunner.runTests();
}

test();
