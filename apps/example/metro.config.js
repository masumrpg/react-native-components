const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

// Get the default Metro config
const config = getDefaultConfig(__dirname);

// Add the monorepo paths
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const libsPath = path.resolve(workspaceRoot, 'libs');

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Add support for symlinked packages
config.resolver.disableHierarchicalLookup = false;

// Force alias resolution to override package.json exports
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Dynamically generate aliases for all libraries
function generateLibraryAliases() {
  const aliases = {};

  try {
    // Read all directories in libs folder
    const libDirectories = fs
      .readdirSync(libsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Generate alias for each library
    libDirectories.forEach((libName) => {
      const libPath = path.resolve(libsPath, libName);
      const srcIndexPath = path.resolve(libPath, 'src/index.ts');
      const packageJsonPath = path.resolve(libPath, 'package.json');

      // Check if src/index.ts exists
      if (fs.existsSync(srcIndexPath)) {
        try {
          // Read package.json to get the actual package name
          const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf8')
          );
          const packageName = packageJson.name;

          if (packageName) {
            // Add alias with the official package name from package.json
            aliases[packageName] = srcIndexPath;
            console.log(`📦 Added alias: ${packageName} -> ${srcIndexPath}`);

            // TAMBAHAN: Juga tambahkan alias tanpa prefix untuk fleksibilitas
            // Jika package name menggunakan scoped package (@masumdev/xxx),
            // tambahkan juga alias tanpa scope (xxx)
            if (packageName.startsWith('@')) {
              const nameWithoutScope = packageName.split('/')[1];
              if (nameWithoutScope) {
                aliases[nameWithoutScope] = srcIndexPath;
                console.log(
                  `📦 Added alias (no scope): ${nameWithoutScope} -> ${srcIndexPath}`
                );
              }
            }

            // TAMBAHAN: Juga tambahkan alias dengan nama direktori untuk fallback
            // Ini berguna jika ada library yang nama direktorinya berbeda dengan package name
            if (libName !== packageName && !packageName.endsWith(libName)) {
              aliases[libName] = srcIndexPath;
              console.log(
                `📦 Added alias (dir name): ${libName} -> ${srcIndexPath}`
              );
            }
          }
        } catch (error) {
          console.warn(
            `⚠️  Could not read package.json for ${libName}:`,
            error.message
          );
          // Fallback: use directory name with @masumdev prefix
          const fallbackNameWithPrefix = `@masumdev/${libName}`;
          const fallbackNameWithoutPrefix = libName;

          aliases[fallbackNameWithPrefix] = srcIndexPath;
          aliases[fallbackNameWithoutPrefix] = srcIndexPath;

          console.log(
            `📦 Added fallback aliases: ${fallbackNameWithPrefix} & ${fallbackNameWithoutPrefix} -> ${srcIndexPath}`
          );
        }
      } else {
        console.warn(`⚠️  No src/index.ts found for library: ${libName}`);
      }
    });

    console.log(`✅ Generated ${Object.keys(aliases).length} library aliases`);
  } catch (error) {
    console.error('❌ Error generating library aliases:', error.message);
  }

  return aliases;
}

// Map the library packages to their source
config.resolver.alias = generateLibraryAliases();

// Override resolver to prioritize alias
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Check if this is one of our aliased packages
  if (config.resolver.alias[moduleName]) {
    return {
      filePath: config.resolver.alias[moduleName],
      type: 'sourceFile',
    };
  }

  // Fall back to default resolution
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  // Use context.resolveRequest sebagai fallback terakhir
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;