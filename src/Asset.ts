// Copyright (c) 2020-2021 eContriver LLC

export interface Asset {
    file: File;
    onLoadCallback: (event: ProgressEvent) => void;
    onProgressCallback: (event: ProgressEvent) => void;
    onLoad(callback: (event: ProgressEvent) => void): void;
    onProgress(callback: (event: ProgressEvent) => void): void;
    load(): void;
}
