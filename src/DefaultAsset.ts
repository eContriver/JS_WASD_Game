// Copyright (c) 2020-2021 eContriver LLC

import { Asset } from './Asset';

export class DefaultAsset implements Asset {
    loaded: boolean = false;
    object: any = null;
    callbacks: Array<any> = [];
    
    constructor(obj) {
        this.loaded = false;
        this.object = obj;
    }
    
    addCallback(callback) {
        this.callbacks.push(callback);
        this.executeCallbacks();
    }

    executeCallbacks() {
        if (!this.loaded) {
            return;
        }
        while (this.callbacks.length > 0) {
            var callback = this.callbacks.pop();
            callback();
        }
    }
}
