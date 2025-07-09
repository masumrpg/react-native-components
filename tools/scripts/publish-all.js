// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const libsDir = path.join(__dirname, '../..', 'libs');

// Cek folder library yang punya package.json
const getLibDirs = () => {
  return fs.readdirSync(libsDir).filter((dir) => {
    const stat = fs.statSync(path.join(libsDir, dir));
    return (
      stat.isDirectory() &&
      fs.existsSync(path.join(libsDir, dir, 'package.json'))
    );
  });
};

// Cek apakah versi sudah publish di NPM
const isVersionPublished = (pkgName, version) => {
  try {
    const result = execSync(`npm view ${pkgName}@${version} version`, {
      stdio: 'pipe',
    })
      .toString()
      .trim();
    return result === version;
  } catch {
    return false;
  }
};

// Naikkan patch version (0.0.1 -> 0.0.2)
const bumpPatchVersion = (version) => {
  const parts = version.split('.').map(Number);
  parts[2]++;
  return parts.join('.');
};

// Auto-increment versi jika sudah pernah dipublish
const autoIncrementVersion = (pkgPath) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  let currentVersion = pkg.version;

  while (isVersionPublished(pkg.name, currentVersion)) {
    currentVersion = bumpPatchVersion(currentVersion);
  }

  if (currentVersion !== pkg.version) {
    console.log(
      `🔁 Auto bumped version ${pkg.name}: ${pkg.version} → ${currentVersion}`
    );
    pkg.version = currentVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }

  return pkg.name + '@' + pkg.version;
};

// Build dan publish satu lib
const publishLib = (lib) => {
  const libRoot = path.join(libsDir, lib);
  const pkgPath = path.join(libRoot, 'package.json');

  const bumped = autoIncrementVersion(pkgPath);

  const distPath = path.join(__dirname, '../..', 'libs', lib);

  console.log(`📦 Building ${lib}...`);
  execSync(`npx nx build ${lib} --skip-nx-cache`, { stdio: 'inherit' });

  const distPkg = path.join(distPath, 'package.json');
  if (!fs.existsSync(distPkg)) {
    console.warn(`❌ No package.json found in ${distPath}, skipping`);
    return;
  }

  console.log(`🚀 Publishing ${bumped}...`);
  try {
    execSync(`npm publish ${distPath} --access public`, { stdio: 'inherit' });
    console.log(`✅ Published ${bumped}`);
  } catch (err) {
    console.warn(`⚠️  Skipped ${bumped}: ${err.message}`);
  }
};

// Loop semua libs
const libs = getLibDirs();
for (const lib of libs) {
  publishLib(lib);
}
