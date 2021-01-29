// Copyright (c) 2021 eContriver LLC

import { Asset } from './Asset';
import { ImageAsset } from './ImageAsset';

export enum AssetType {
    UNKNOWN = -1,
    IMAGE,
    JAVASCRIPT,
    JSON,
    CSS,
}

export class AssetMgr {
    assets: Map<string, Asset> = new Map();
    handlers: Map<AssetType, new(p: any) => Asset> = new Map();
    
    constructor() {
        this.assets = new Map();
        this.handlers.set(AssetType.IMAGE, ImageAsset);
    }
    
    static getAssetType(path: string) {
        if (path.indexOf('.jpg') != -1
            || path.indexOf('.jpeg') != -1
            || path.indexOf('.png') != -1
            || path.indexOf('.gif') != -1
            || path.indexOf('.wp') != -1) {
            return AssetType.IMAGE;
        }

        if (path.indexOf('.js') != -1) {
            return AssetType.JAVASCRIPT;
        }

        if (path.indexOf('.json') != -1) {
            return AssetType.JSON;
        }

        if (path.indexOf('.css') != -1) {
            return AssetType.CSS;
        }

        return AssetType.UNKNOWN;
    }

    assignHandler<T extends Asset>(type: AssetType, handler: new(p: any) => T) {
        this.handlers[type] = handler;
    }

    loadList(paths, callback): void {
        paths.map(function (path) {
            this.load(path, callback);
        });
    }

    load(path: string, callback: any): Asset {
        let asset: Asset = this.assets[path] ? this.assets[path] : null;
        if (asset == null) {
            let type: AssetType = AssetMgr.getAssetType(path);
            if (!this.handlers[type]) {
                throw new Error("No handler assigned to asset type for: " + path);
            }
            let handler: new(p: any) => Asset = this.handlers[type];
            asset = new handler(path);
            if (callback) {
                asset.addCallback(callback);
            }
            this.assets.set(path, asset);
            // switch (AssetMgr.getAssetType(path)) {
            //     case AssetType.IMAGE:
            //         asset = new ImageAsset(path);
            //         if (callback) {
            //             asset.addCallback(callback);
            //         }
            //         this.assets.set(path, asset);
            //         break;
            //     default:
            //         throw new Error("No handler assigned to asset type for: " + path);
            //         break;
            // }
        }
        return asset;
    }
}
