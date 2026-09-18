import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(projectRoot, 'public');
const builtRoot = path.join(projectRoot, 'dist', 'public');
const justinPage = path.join(projectRoot, 'src', 'pages', 'Justin.tsx');

const requiredAssets = [
  'images/justin-huff.webp',
  'images/justin-qr.png',
];

const placeholderCopy =
  /\b(?:placeholder|coming soon|under construction|contact card (?:is )?unavailable)\b/i;

async function assertFile(filePath, label) {
  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile() || fileStats.size === 0) {
      throw new Error(`${label} is empty`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`${label} is missing: ${filePath}`);
    }
    throw error;
  }
}

async function readBuiltJavaScript() {
  const assetsRoot = path.join(builtRoot, 'assets');
  const files = await readdir(assetsRoot);
  const javascriptFiles = files.filter((file) => file.endsWith('.js'));

  if (javascriptFiles.length === 0) {
    throw new Error(`No built JavaScript files found in ${assetsRoot}`);
  }

  return (
    await Promise.all(
      javascriptFiles.map((file) => readFile(path.join(assetsRoot, file), 'utf8')),
    )
  ).join('\n');
}

const pageSource = await readFile(justinPage, 'utf8');

for (const asset of requiredAssets) {
  await assertFile(path.join(publicRoot, asset), `Source asset ${asset}`);
  await assertFile(path.join(builtRoot, asset), `Built asset ${asset}`);

  if (!pageSource.includes(`/images/${path.basename(asset)}`)) {
    throw new Error(`Justin route does not reference /images/${path.basename(asset)}`);
  }
}

if (placeholderCopy.test(pageSource)) {
  throw new Error('Justin route contains placeholder copy');
}

const builtJavaScript = await readBuiltJavaScript();
for (const asset of requiredAssets) {
  if (!builtJavaScript.includes(`/images/${path.basename(asset)}`)) {
    throw new Error(`Built Justin route is missing /images/${path.basename(asset)}`);
  }
}

console.log('Justin card validation passed: assets, route references, and copy are production-ready.');
