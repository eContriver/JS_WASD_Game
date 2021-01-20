// Copyright (c) 2020-2021 eContriver LLC

import { Asset } from './Asset';

export class DefaultAsset implements Asset {
    file: File;
    onLoadCallback: (event: ProgressEvent) => void;
    onProgressCallback: (event: ProgressEvent) => void;
    constructor(filePath: string) {
        this.file = new File([], filePath);
    }
    onLoad(callback: (event: ProgressEvent) => void) {
        this.onLoadCallback = callback;
    }
    onProgress(callback: (event: ProgressEvent) => void) {
        this.onProgressCallback = callback;
    }
    load() {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            this.onLoadCallback(event);
        });
        reader.addEventListener('progress', (event) => {
            this.onProgressCallback(event);
        });
        reader.readAsDataURL(this.file);
    }
}
