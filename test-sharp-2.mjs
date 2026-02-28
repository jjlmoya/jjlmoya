import sharp from 'sharp';
const imageFile = 'C:\\Users\\34677\\.gemini\\antigravity\\brain\\bc868635-aec2-47f9-91be-74ec34fb905c\\compresor_imagenes_1772273378460.png';
const outPath = 'd:\\code\\jjlmoya\\public\\images\\utilities\\compresor-imagenes.webp';

sharp(imageFile)
    .webp({ quality: 80 })
    .toFile(outPath)
    .then(() => console.log('Image converted to webp at', outPath))
    .catch(err => console.error(err));
