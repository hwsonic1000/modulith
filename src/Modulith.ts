import { FileSystem } from "./filesystem/FileSystem";

export interface ModulithOptions {
    // Configuration options will go here.
}

export class Modulith {
    public fs: FileSystem;

    constructor() {
        this.fs = new FileSystem();
    }

    async initialize() {
        await this.fs.initialize();
    }
}