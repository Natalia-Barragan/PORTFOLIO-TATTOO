const fs = require('fs');
const path = require('path');

const OLD_TEXT = 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent';
const OLD_BG = 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400';

const NEW_TEXT = 'text-metal-plateado';
const NEW_BG = 'bg-metal-plateado';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace text color
    content = content.split(OLD_TEXT).join(NEW_TEXT);
    
    // Replace background color
    content = content.split(OLD_BG).join(NEW_BG);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
            replaceInFile(fullPath);
        }
    }
}

processDir(__dirname);
console.log('Done applying custom metallic utility classes.');
