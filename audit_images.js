const fs = require('fs');
const path = require('path');

function walkDir(dir, exts, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkDir(full, exts, files);
    else if (exts.some(e => f.endsWith(e))) files.push(full);
  }
  return files;
}

const srcFiles = walkDir('src', ['.tsx', '.ts', '.css']);
const imgRefs = new Set();
const imgRegex = /['"`](\/[^'"`\s]+\.(jpg|jpeg|png|webp|gif|svg))['"`]/g;

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    imgRefs.add(m[1]);
  }
  imgRegex.lastIndex = 0;
}

const existing = new Set();
function walkPub(dir, base) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkPub(full, base);
    else {
      const rel = '/' + path.relative(base, full).replace(/\\/g, '/');
      existing.add(rel);
    }
  }
}
walkPub('public', 'public');

const missing = [...imgRefs].filter(r => !existing.has(r));
console.log('MISSING IMAGES:');
missing.forEach(m => console.log(m));
console.log('\nTotal missing:', missing.length);
