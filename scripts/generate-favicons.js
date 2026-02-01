/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

// Create PNG versions from SVG
async function createFavicons() {
    const logoSvg = fs.readFileSync(path.join(publicDir, 'logo.svg'));

    // Create favicon.ico (multi-size) - for now create a 32x32 PNG
    await sharp(logoSvg)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon-32x32.png'));

    await sharp(logoSvg)
        .resize(16, 16)
        .png()
        .toFile(path.join(publicDir, 'favicon-16x16.png'));

    // Create apple-touch-icon PNG
    const appleSvg = fs.readFileSync(path.join(publicDir, 'apple-touch-icon.svg'));
    await sharp(appleSvg)
        .resize(180, 180)
        .png()
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    console.log('Favicons created successfully!');
}

createFavicons().catch(console.error);
