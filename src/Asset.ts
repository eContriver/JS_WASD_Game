// Copyright (c) 2020-2021 eContriver LLC

export interface Asset {
    loaded: boolean;
    callbacks: Array<any>;

    addCallback: (callback) => void;
    executeCallbacks: () => void;
}
