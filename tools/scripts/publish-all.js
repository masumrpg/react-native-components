// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const libsDir = path.join(__dirname, '../..', 'libs');

const getLibDirs = () => {
  return fs.readdirSync(libsDir).filter((dir) => {
    const stat = fs.statSync(path.join(libsDir, dir));
    return (
      stat.isDirectory() &&
      fs.existsSync(path.join(libsDir, dir, 'package.json'))
    );
  });
};

const publishLib = (lib) => {
  const distPath = path.join(__dirname, '../..', 'libs', lib);

  console.log(`📦 Building ${lib}...`);
  execSync(`npx nx build ${lib}`, { stdio: 'inherit' });

  console.log(`🚀 Publishing ${lib}...`);
  try {
    execSync(`npm publish ${distPath} --access public`, { stdio: 'inherit' });
    console.log(`✅ Published ${lib}`);
  } catch (err) {
    console.warn(`⚠️  Skipped ${lib}: ${err.message}`);
  }
};

const libs = getLibDirs();

for (const lib of libs) {
  publishLib(lib);
}
