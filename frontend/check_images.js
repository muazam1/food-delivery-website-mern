import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public', 'images');
const images = ['burger.png', 'pizza.png'];

console.log(`Checking directory: ${publicDir}`);

if (fs.existsSync(publicDir)) {
    console.log("Directory exists.");
    images.forEach(img => {
        const fullPath = path.join(publicDir, img);
        if (fs.existsSync(fullPath)) {
            console.log(`Found: ${img}`);
        } else {
            console.log(`MISSING: ${img}`);
        }
    });
} else {
    console.log("Directory DOES NOT exist.");
    // Try checking src/assets just in case
    const assetsDir = path.join(process.cwd(), 'src', 'assets');
    console.log(`Checking fallback: ${assetsDir}`);
    if (fs.existsSync(assetsDir)) {
        console.log("Assets directory exists.");
    }
}
