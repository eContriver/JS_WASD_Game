// Copyright (c) 2021 eContriver LLC

/// <reference path="../main/game.ts" />

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
