// Copyright (c) 2020-2021 eContriver LLC

import { DefaultAsset } from './DefaultAsset';

export class ImageAsset extends DefaultAsset {
    element: HTMLImageElement = null;
    
    constructor(path: string) {
        super();
        this.element = new Image();
        this.element.onload = () => function () {
            this.loaded = true;
            this.executeCall
        };
        this.element.src = path; // start loading
    }
    
}
