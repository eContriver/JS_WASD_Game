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

import {expect} from "chai";
describe("constructsDefaultAsset", function() {
  it("checks that we can create a new DefaultAsset", function() {
    expect(new DefaultAsset("testlet.js")).to.equal(null);
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