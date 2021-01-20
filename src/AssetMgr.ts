// Copyright (c) 2020-2021 eContriver LLC

export class AssetMgr {
    imagesPending: any[];
    imagesLoaded: any[];
    imageObjects: Map<any, any>;
    imageCallbacks: Map<any, any>;
    scriptsPending: any[];
    scriptsLoaded: any[];
    scriptCallbacks: Map<any, any>;
    constructor() {
        this.imagesPending = [];
        this.imagesLoaded = [];
        this.imageObjects = new Map();
        this.imageCallbacks = new Map();
        this.scriptsPending = [];
        this.scriptsLoaded = [];
        this.scriptCallbacks = new Map();
    }
    addScripts(scripts: any[]) {
        scripts.forEach((function (script: any) {
            if (this.scriptsLoaded.includes(script))
                return;
            if (this.scriptsPending.includes(script))
                return;
            this.scriptsPending.push(script);
            this.loadScript(script, (function () {
                const index = this.scriptsPending.indexOf(script);
                this.scriptsLoaded.push(script); // let it exist in both briefly
                this.scriptsPending.splice(index, 1); // remove it
                this.runScriptCallbacks(script); // run callbacks as they were
            }).bind(this));
        }).bind(this));
    }
    onScriptLoad(script: any, func: any) {
        this.scriptCallbacks.set(script, func);
        this.runScriptCallbacks(script); // run callbacks now in case it was loaded
    }
    runScriptCallbacks(script: any) {
        if (this.scriptCallbacks.has(script) && this.scriptsLoaded.includes(script)) {
            let func = this.scriptCallbacks.get(script); // and run it
            func(script);
        }
    }
    loadScript(file: string, func: (this: HTMLScriptElement, ev: Event) => any) {
        let element = document.createElement('script');
        element.addEventListener('load', func); // must set before src
        element.type = 'text/javascript';
        element.src = file;
        document.getElementsByTagName("head")[0].appendChild(element);
    }
    addImages(srcs: any[]) {
        srcs.forEach(function (src: any) {
            if (this.imagesLoaded.includes(src))
                return;
            if (this.imagesPending.includes(src))
                return;
            this.imagesPending.push(src);
            this.loadImage(src, function () {
                const index = this.imagesPending.indexOf(src);
                this.imagesLoaded.push(src); // let it exist in both briefly
                this.imagesPending.splice(index, 1); // remove it
                this.runImageCallbacks(src);
            }.bind(this));
        }.bind(this));
    }
    onImageLoad(src: any, func: any) {
        this.imageCallbacks.set(src, func);
        this.runImageCallbacks(src);
    }
    runImageCallbacks(src: any) {
        if (this.imageCallbacks.has(src) && this.imagesLoaded.includes(src)) {
            let func = this.imageCallbacks.get(src); // and run it
            func(this.imageObjects.get(src));
        }
    }
    loadImage(image: string, func: (this: GlobalEventHandlers, ev: Event) => any) {
        let loader = new Image();
        loader.onload = func; // must set onload first

        // loader.onerror = function() { throw "failed to load ${image}"; }
        loader.src = image; // starts download the image now
        this.imageObjects.set(image, loader);
    }
}
