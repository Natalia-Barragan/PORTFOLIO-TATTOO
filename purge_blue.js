const fs = require('fs');
const path = require('path');

const OLD_BLUE_1 = '#0044FF';
const OLD_BLUE_2 = '#0044ff';
const OLD_BLUE_3 = '#0033CC';
const OLD_BLUE_4 = '#0033cc';
const BLUE_RGBA1 = 'rgba\\(0,\\s*68,\\s*255';
const BLUE_RGBA2 = 'rgba\\(0,68,255';
const BLUE_RGBA3 = 'rgba\\(0,\\s*200,\\s*255'; // Some other blue

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace remaining blues with silver/gray
    content = content.replace(new RegExp(OLD_BLUE_1, 'g'), '#C0C0C0');
    content = content.replace(new RegExp(OLD_BLUE_2, 'g'), '#C0C0C0');
    content = content.replace(new RegExp(OLD_BLUE_3, 'g'), '#A0A0A0');
    content = content.replace(new RegExp(OLD_BLUE_4, 'g'), '#A0A0A0');
    
    content = content.replace(new RegExp(BLUE_RGBA1, 'g'), 'rgba(192, 192, 192');
    content = content.replace(new RegExp(BLUE_RGBA2, 'g'), 'rgba(192, 192, 192');
    content = content.replace(new RegExp(BLUE_RGBA3, 'g'), 'rgba(192, 192, 192');

    // Also catch from-blue-xxx to-blue-xxx just in case
    content = content.replace(/from-blue-\d+/g, 'from-gray-300');
    content = content.replace(/to-blue-\d+/g, 'to-gray-400');
    content = content.replace(/via-blue-\d+/g, 'via-gray-100');
    content = content.replace(/bg-blue-\d+/g, 'bg-gray-300');
    content = content.replace(/text-blue-\d+/g, 'text-gray-300');
    content = content.replace(/border-blue-\d+/g, 'border-gray-300');
    content = content.replace(/ring-blue-\d+/g, 'ring-gray-300');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed blue from ${filePath}`);
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
console.log('Blue purge complete.');
