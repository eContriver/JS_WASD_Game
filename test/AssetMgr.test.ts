// Copyright (c) 2021 eContriver LLC

import { assert } from "chai";
import { AssetMgr, AssetType } from '../src/AssetMgr';
import { Asset } from '../src/Asset';
import { DefaultAsset } from "../src/DefaultAsset";

export class MockAsset extends DefaultAsset {
    constructor(path: string) {
        super();
    }
}

describe("AssetMgr", function() {
    let assetMgr: AssetMgr = null;
    it("checks that constructor works", function () {
        assetMgr = new AssetMgr();
        assetMgr.assignHandler(AssetType.IMAGE, MockAsset);
        assert.equal(assetMgr.assets.size, 0, 'AssetMgr should not have any assets yet');
    });
    it("checks that load works", function () {
        let callbackRan = false;
        let a: Asset = assetMgr.load("/some/path.png", function (){
            callbackRan = true;
        });
        assert.equal(callbackRan, false, 'Asset should not be loaded yet')
        a.loaded = true;
        a.executeCallbacks();
    });
});