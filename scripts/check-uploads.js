const fs = require('fs');
const path = require('path');
const distAssets = path.join(__dirname, '..', 'frontend', 'dist', 'assets');
const uploadsDir = path.join(__dirname, '..', 'backend', 'dist', 'uploads');

function getAllJsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => path.join(dir, f));
}

const jsFiles = getAllJsFiles(distAssets);
const refs = new Set();
const re = /\"(\/uploads\/[^"]+?)\"/g;
for (const file of jsFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = re.exec(text))) {
    refs.add(m[1]);
  }
}

const filesOnDisk = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
const lowerSet = new Set(filesOnDisk.map(f => f.toLowerCase()));

const missing = [];
for (const ref of refs) {
  const name = ref.replace('/uploads/', '');
  if (!lowerSet.has(name.toLowerCase())) missing.push(name);
}

if (missing.length === 0) {
  console.log('All upload refs found on disk.');
} else {
  console.log('Missing files:', missing);
}
