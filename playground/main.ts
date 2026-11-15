
import { FileSystem } from "../src/filesystem/FileSystem";

const output = document.querySelector<HTMLPreElement>("#output")!;

async function test() {
    try {
        const fs = new FileSystem();

        output.textContent = "Initializing filesystem...\n";

        await fs.initialize();

        output.textContent += "Filesystem initialized!\n";

        // Write a file
        await fs.writeFile("/hello.txt", "Hello from Modulith!");

        output.textContent += "File written!\n";

        // Read the file
        const content = await fs.readFile("/hello.txt");

        output.textContent += `File contents: ${content}\n`;

        // Check whether it exists
        const exists = await fs.exists("/hello.txt");

        output.textContent += `File exists: ${exists}\n`;

        // Create a directory
        await fs.createDirectory("/projects");

        output.textContent += "Directory created!\n";

        // List directory contents
        const files = await fs.readDirectory("/");

        output.textContent += `Root directory: ${files.join(", ")}\n`;

        output.textContent += "\nAll tests passed!";
    } catch (error) {
        output.textContent += `\nERROR: ${error}`;
        console.error(error);
    }
}

test();
