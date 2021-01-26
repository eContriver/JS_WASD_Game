// Copyright (c) 2020-2021 eContriver LLC

export interface Asset {
    loaded: boolean;
    object: any;
    callbacks: any[];

    addCallback: (callback) => void;
    executeCallbacks: () => void;
}
