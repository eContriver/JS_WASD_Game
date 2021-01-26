// Copyright (c) 2021 eContriver LLC

// <reference path="../src/game.ts" />

import { Asset } from '../src/Asset';
import { DefaultAsset } from '../src/DefaultAsset';
// 
// class TestRunner {
    // runTests() {
        // let t: Asset = new DefaultAsset("test.js");
        // t.onLoad(function(event: any) {
            // const result = event.target.result;
            // console.log(`Result: ${result}`);
        // });
        // t.onProgress(function(event: any) {
            // if (event.loaded && event.total) {
                // const percent = (event.loaded / event.total) * 100;
                // console.log(`Progress: ${Math.round(percent)}`);
            // }
        // });
    // }
// }
// 
// function test() {
    // let testRunner = new TestRunner();
    // testRunner.runTests();
// }
// 
// test();

// import {describe} from "mocha";
import {assert} from "chai";
// var assert = require("assert");
describe("DefaultAsset", function() {
    let asset: Asset = null;
    let callbackExecuted = false;
    it("checks that constructor works", function () {
        asset = new DefaultAsset("../resources/dot.png");
    });
    it("checks that callback is not executed before asset is loaded", function () {
        asset.addCallback(function () {
            callbackExecuted = true;
        });
        assert.equal(callbackExecuted, false);
    });
    it("checks that callback is executed when asset is loaded", function () {
        asset.loaded = true;
        asset.executeCallbacks();
        assert.equal(callbackExecuted, true);
    });
    it("checks that callback is executed immediately when arleady loaded", function () {
        let immediatelyExecuted = false;
        asset.addCallback(function () {
            immediatelyExecuted = true;
        });
        assert.equal(immediatelyExecuted, true);
    });
});
// describe("sortByDistance", function() {
//   it("sortsByDistance", function() {
//     let places = [
//       {name: "Far away", x: 100, y: 50},
//       {name: "Nearby", x: 20, y: 10},
//     ];
//     let origin = {name: "Origin", x: 0, y: 0};
//     let sorted = sortByDistance(origin, places);
//       expect(sorted[0].name).to.equal("Nearby");
//       expect(sorted[1].name).to.equal("Far away");
//     });
// });