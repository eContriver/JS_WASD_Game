// Copyright (c) 2021 eContriver LLC

import { assert } from "chai";
import { Asset } from '../src/Asset';
import { ImageAsset } from '../src/ImageAsset';

describe("ImageAsset", function() {
    let asset: Asset = null;
    let callbackExecuted = false;

    // TODO: Move lots of this into DefaultAsset
    it("checks that constructor works", function () {
        asset = new ImageAsset("../resources/dot.png");
        assert.equal(callbackExecuted, false);
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