const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createLib(packageName) {
  if (!packageName) {
    console.log('Usage: npm run create-lib <package-name>');
    console.log('Example: npm run create-lib rnc-fab');
    process.exit(1);
  }

  try {
    // Generate library using nx
    console.log(`Creating library: ${packageName}`);
    execSync(
      `bunx nx g @nx/expo:lib libs/${packageName} ${packageName} --importPath=${packageName}`,
      {
        stdio: 'inherit',
      }
    );

    console.log('Applying templates...');

    // Apply package.json template
    const packageJsonTemplate = path.join(
      'tools',
      'templates',
      'package.json.template'
    );
    if (fs.existsSync(packageJsonTemplate)) {
      const template = fs.readFileSync(packageJsonTemplate, 'utf8');
      const content = template.replace(/{{PACKAGE_NAME}}/g, packageName);
      fs.writeFileSync(`libs/${packageName}/package.json`, content);
      console.log(`✅ Applied package.json template for ${packageName}`);
    } else {
      console.log(
        '⚠️  Warning: tools/templates/package.json.template not found, using default'
      );
    }

    // Apply tsconfig template
    const tsconfigTemplate = path.join(
      'tools',
      'templates',
      'tsconfig.lib.json.template'
    );
    if (fs.existsSync(tsconfigTemplate)) {
      fs.copyFileSync(
        tsconfigTemplate,
        `libs/${packageName}/tsconfig.lib.json`
      );
      console.log(`✅ Applied tsconfig.lib.json template for ${packageName}`);
    } else {
      console.log(
        '⚠️  Warning: tools/templates/tsconfig.lib.json.template not found, using default'
      );
    }
  } catch (error) {
    console.error('Error creating library:', error);
    process.exit(1);
  }
}

// Get package name from command line arguments
const packageName = process.argv[2];
createLib(packageName);
