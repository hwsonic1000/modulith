export interface ModulithOptions {
    // Configuration options will go here.
}

export class Modulith {
    constructor(options: ModulithOptions = {}) {
        console.log("Modulith created.");
    }

    async initialize(): Promise<void> {
        console.log("Modulith initialized.");
    }
}