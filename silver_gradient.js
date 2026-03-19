const fs = require('fs');
const path = require('path');

const TEXT_SILVER = 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent';
const BG_SILVER = 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400';
const BORDER_SILVER = 'border-gray-300';
const FILL_SILVER = 'fill-gray-300';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace text color
    content = content.replace(/text-\[\#C0C0C0\]/g, TEXT_SILVER);
    
    // Replace background color
    content = content.replace(/bg-\[\#C0C0C0\]/g, BG_SILVER);
    
    // Replace borders
    content = content.replace(/border-\[\#C0C0C0\]/g, BORDER_SILVER);

    // Replace from-to gradients
    content = content.replace(/from-\[\#C0C0C0\]/g, 'from-gray-300');
    content = content.replace(/to-\[\#C0C0C0\]/g, 'to-gray-400');
    content = content.replace(/via-\[\#C0C0C0\]/g, 'via-gray-100');
    
    // Replace stroke/fill if any
    content = content.replace(/stroke-\[\#C0C0C0\]/g, 'stroke-gray-300');
    content = content.replace(/fill-\[\#C0C0C0\]/g, 'fill-gray-300');

    // Replace literal hex codes in js logic or non-tailwind spots with gray-300 hex
    content = content.replace(/#C0C0C0/g, '#d1d5db');

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
console.log('Done replacing with metallic silver gradients.');
