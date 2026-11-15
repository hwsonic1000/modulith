
import { configureSingle, fs } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";

// ZenFS has a shared filesystem instance.
// Configure it only once.
let initialization: Promise<void> | null = null;

export class FileSystem {
    private initialized = false;

    public async initialize(): Promise<void> {
        if (this.initialized) return;

        initialization ??= configureSingle({
            backend: IndexedDB,
            storeName: "modulith"
        }).catch((error) => {
            initialization = null;
            throw error;
        });

        await initialization;
        this.initialized = true;
    }

    private ensureInitialized(): void {
        if (!this.initialized) {
            throw new Error(
                "Modulith filesystem has not been initialized."
            );
        }
    }

    public async writeFile(
        path: string,
        content: string
    ): Promise<void> {
        this.ensureInitialized();

        await fs.promises.writeFile(path, content, "utf8");
    }

    public async readFile(path: string): Promise<string> {
        this.ensureInitialized();

        return await fs.promises.readFile(path, "utf8");
    }

    public async deleteFile(path: string): Promise<void> {
        this.ensureInitialized();

        await fs.promises.unlink(path);
    }

    public async exists(path: string): Promise<boolean> {
        this.ensureInitialized();

        try {
            await fs.promises.access(path);
            return true;
        } catch {
            return false;
        }
    }

    public async createDirectory(path: string): Promise<void> {
        this.ensureInitialized();

        await fs.promises.mkdir(path, { recursive: true });
    }

    public async readDirectory(path: string): Promise<string[]> {
        this.ensureInitialized();

        return await fs.promises.readdir(path);
    }
}
