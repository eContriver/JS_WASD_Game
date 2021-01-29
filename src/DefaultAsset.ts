// Copyright (c) 2020-2021 eContriver LLC

import { Asset } from "./Asset";

export abstract class DefaultAsset implements Asset {
    loaded: boolean = null;
    callbacks: Array<any> = null;

    constructor() {
        this.loaded = false;
        this.callbacks = new Array();
    }

    addCallback(callback): void {
        this.callbacks.push(callback);
        this.executeCallbacks();
    }

    executeCallbacks(): void {
        if (!this.loaded) {
            return;
        }
        while (this.callbacks.length > 0) {
            let callback = this.callbacks.pop();
            callback();
        }
    }
}
