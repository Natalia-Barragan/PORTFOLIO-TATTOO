const fs = require('fs');
const path = require('path');

const OLD_COLOR_LOWER = '#0044ff';
const OLD_COLOR_UPPER = '#0044FF';
const NEW_COLOR = '#C0C0C0'; // Silver
const NEW_COLOR_HOVER = '#A0A0A0'; // Darker silver for hover

// We may also have blue/orange references in terms of class names, but for now we replace the hex.

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace hex directly
    content = content.split(OLD_COLOR_UPPER).join(NEW_COLOR);
    content = content.split(OLD_COLOR_LOWER).join(NEW_COLOR);
    // There may be hover states with '#0033cc' or '#0033CC' (darker blue)
    content = content.split('#0033CC').join(NEW_COLOR_HOVER);
    content = content.split('#0033cc').join(NEW_COLOR_HOVER);
    
    // Also update glow-accent in globals.css which uses rgba
    content = content.replace('rgba(255, 140, 66', 'rgba(192, 192, 192'); // if it was orange before
    content = content.replace('rgba(0, 68, 255', 'rgba(192, 192, 192'); // if it is blue

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
console.log('Done replacing colors.');
