import { promises as fs } from 'fs';
import path from 'path';

const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const checkDocumentation = async (srcDir, docsDir) => {
    const missingDocs = [];

    async function traverse(currentPath) {
        const files = await fs.readdir(currentPath);

        for (const file of files) {
            const fullPath = path.join(currentPath, file);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                await traverse(fullPath);
            } else if (currentPath != './src/rules' && file.endsWith('.ts') && !file.endsWith('.test.ts')) {
                const baseName = path.basename(file, '.ts');
                const kebabCaseName = camelToKebab(baseName) + '.md';

                const relativePath = path.relative(srcDir, currentPath);
                const expectedDocPath = path.join(docsDir, relativePath, kebabCaseName);

                try {
                    await fs.access(expectedDocPath);
                } catch {
                    missingDocs.push({ srcFile: file, expectedDoc: expectedDocPath });
                }
            }
        }
    }

    await traverse(srcDir);
    return missingDocs;
}

// Usage
const srcDirectory = './src/rules';
const docsDirectory = './docs/rules';

const checkDocs = async () => {
    try {
        const missingDocumentation = await checkDocumentation(srcDirectory, docsDirectory);

        if (missingDocumentation.length > 0) {
            console.log(`Missing ${missingDocumentation.length} documentation files:`);
            missingDocumentation.forEach(({ srcFile, expectedDoc }) => {
                console.log(`- ${srcFile} -> ${expectedDoc}`);
            });
        } else {
            console.log("All documentation files are present.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

checkDocs()
