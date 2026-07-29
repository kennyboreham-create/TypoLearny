const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'public', 'config.js');
const apiBase = process.env.API_BASE_URL || '';
const content = `window.__API_BASE__ = ${JSON.stringify(apiBase)};\n`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Wrote ${outputPath} with API_BASE_URL=${apiBase}`);
