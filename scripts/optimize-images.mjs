import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../public/assets/images');
const outputDir = join(__dirname, '../public/assets/images-optimized');

console.log('🖼️  Starting image optimisation...');
console.log(`📁 Input: ${inputDir}`);
console.log(`📁 Output: ${outputDir}\n`);

try {
  const files = await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
    destination: outputDir,
    plugins: [
      imageminMozjpeg({ quality: 80 }), // JPEG optimisation
      imageminPngquant({ quality: [0.7, 0.9] }) // PNG optimisation
    ]
  });

  console.log(`✅ Optimised ${files.length} images successfully!`);
  console.log('\n📊 Results:');
  files.forEach(file => {
    console.log(`   ✓ ${file.destinationPath.split('/').pop()}`);
  });
  console.log('\n💡 Next steps:');
  console.log('   1. Review optimised images in public/assets/images-optimized/');
  console.log('   2. If satisfied, replace original images with optimised versions');
  console.log('   3. Delete the images-optimized folder after copying\n');
} catch (error) {
  console.error('❌ Error optimizing images:', error);
  process.exit(1);
}
