const fs = require('fs');
const path = require('path');

// Source: node_modules/pdfjs-dist/build/pdf.worker.min.js
// Destination: public/pdf.worker.min.js
const source = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');
const dest = path.join(__dirname, '../public/pdf.worker.min.js');

try {
  // Ensure the destination directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(source, dest);
  console.log('PDF.js worker copied successfully');
} catch (error) {
  console.error('Error copying PDF.js worker:', error);
  process.exit(1);
}