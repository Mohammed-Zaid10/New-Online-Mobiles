const fs = require('fs');
const path = require('path');

// Recursively collect all .tsx files
function collectFiles(dir, ext, out) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) collectFiles(full, ext, out);
    else if (entry.endsWith(ext)) out.push(full);
  }
}

const srcDir = 'src';
const tsxFiles = [];
collectFiles(srcDir, '.tsx', tsxFiles);

// Regex to capture src='...' or src="..." values that start with /
const srcRegex = /src\s*=\s*['"](\/[^'"\s]+)\.(png|jpe?g|webp|svg)['"]/g;

const referenced = new Set();
for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    referenced.add(match[1] + '.' + match[2]);
  }
}

// Collect existing public assets
const publicDir = 'public';
const existing = new Set();
function collectPublic(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      collectPublic(full);
    } else {
      const rel = '/' + path.relative(publicDir, full).replace(/\\\\/g, '/');
      existing.add(rel);
    }
  }
}
collectPublic(publicDir);

// Find missing
const missing = [];
for (const ref of referenced) {
  if (!existing.has(ref)) missing.push(ref);
}

console.log('MISSING IMAGES COUNT:', missing.length);
missing.forEach(m => console.log(m));
