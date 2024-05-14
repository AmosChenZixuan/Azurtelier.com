import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function compress_png(directoryPath) {
    const files = await fs.promises.readdir(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stat = await fs.promises.stat(filePath);
        if (stat.isDirectory()) {
            await compress_png(filePath);
        } else if (path.extname(file).toLowerCase() === '.png') {
            const originalSize = stat.size;
            const info = await sharp(filePath)
                .jpeg({ quality: 90})
                .toFile(`${directoryPath}/${path.basename(file, '.png')}.jpg`);
            const newSize = info.size;
            const sizeReduction = ((originalSize - newSize) / originalSize) * 100;
            console.log(`Converted ${file} from PNG (${originalSize}) to JPG (${newSize}). Size reduction: ${sizeReduction.toFixed(2)}%`);
            await fs.promises.unlink(filePath); // delete the original file
        }
    }
}

compress_png(path.join(process.cwd(), 'public/static/gallery'));