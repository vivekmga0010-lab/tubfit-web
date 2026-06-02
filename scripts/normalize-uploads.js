const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const dirs = [
  path.join(projectRoot, 'frontend', 'public', 'uploads'),
  path.join(projectRoot, 'backend', 'dist', 'uploads')
];
const textFilesToPatch = [
  path.join(projectRoot, 'frontend', 'src', 'main.jsx'),
];

function norm(name) {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_.-]/gi, (m) => (m === ' ' ? '_' : m))
    .toLowerCase();
}

const mappings = [];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const items = fs.readdirSync(dir);
  for (const oldName of items) {
    const oldPath = path.join(dir, oldName);
    const stat = fs.statSync(oldPath);
    if (!stat.isFile()) continue;
    const newName = norm(oldName);
    if (newName === oldName) continue;
    const newPath = path.join(dir, newName);
    if (fs.existsSync(newPath)) {
      console.log('Skipping rename because target exists:', oldPath, '->', newPath);
      continue;
    }
    fs.renameSync(oldPath, newPath);
    console.log('Renamed:', oldPath, '->', newPath);
    mappings.push({ oldName, newName });
  }
}

if (mappings.length === 0) {
  console.log('No files renamed.');
  process.exit(0);
}

// Update references in text files
const walkAndPatch = (startDir) => {
  const exts = ['.js', '.jsx', '.html'];
  const items = fs.readdirSync(startDir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(startDir, it.name);
    if (it.isDirectory()) {
      walkAndPatch(p);
    } else if (exts.includes(path.extname(it.name))) {
      let text = fs.readFileSync(p, 'utf8');
      let replaced = false;
      for (const { oldName, newName } of mappings) {
        if (text.includes(oldName)) {
          const re = new RegExp(oldName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
          text = text.replace(re, newName);
          replaced = true;
        }
      }
      if (replaced) {
        fs.writeFileSync(p, text, 'utf8');
        console.log('Patched references in', p);
      }
    }
  }
};

// Patch frontend src and dist
const targets = [
  path.join(projectRoot, 'frontend', 'src'),
  path.join(projectRoot, 'frontend', 'dist'),
  path.join(projectRoot, 'backend', 'dist')
];
for (const t of targets) {
  if (fs.existsSync(t)) walkAndPatch(t);
}

console.log('Done. Mappings:', mappings);
