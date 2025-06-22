const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get all library folders
function getLibraryFolders() {
  const libsPath = path.join(__dirname, '../../libs');
  try {
    return fs.readdirSync(libsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error('Error reading libs folder:', error.message);
    return [];
  }
}

// Function to display menu and get user choice
function displayMenu(libraries) {
  console.log('\n📦 Available Libraries to Build:');
  console.log('0. Build All Libraries');

  libraries.forEach((lib, index) => {
    console.log(`${index + 1}. ${lib}`);
  });

  console.log(`${libraries.length + 1}. Cancel`);
  console.log('');
}

// Function to build specific library
function buildLibrary(libraryName) {
  try {
    console.log(`\n🔨 Building ${libraryName}...`);
    execSync(`bunx nx run ${libraryName}:build`, { stdio: 'inherit' });
    console.log(`✅ Successfully built ${libraryName}`);
  } catch (error) {
    console.error(`❌ Failed to build ${libraryName}:`, error.message);
    process.exit(1);
  }
}

// Function to build all libraries
function buildAllLibraries() {
  try {
    console.log('\n🔨 Building all libraries...');
    execSync('bunx nx run-many --target=build --projects=libs/*', { stdio: 'inherit' });
    console.log('✅ Successfully built all libraries');
  } catch (error) {
    console.error('❌ Failed to build libraries:', error.message);
    process.exit(1);
  }
}

// Main function
function main() {
  const libraries = getLibraryFolders();

  if (libraries.length === 0) {
    console.log('❌ No libraries found in libs/ folder');
    process.exit(1);
  }

  displayMenu(libraries);

  rl.question('Choose an option (0-' + (libraries.length + 1) + '): ', (answer) => {
    const choice = parseInt(answer);

    if (isNaN(choice) || choice < 0 || choice > libraries.length + 1) {
      console.log('❌ Invalid choice. Please try again.');
      rl.close();
      return main();
    }

    if (choice === 0) {
      // Build all libraries
      buildAllLibraries();
    } else if (choice === libraries.length + 1) {
      // Cancel
      console.log('👋 Build cancelled.');
    } else {
      // Build specific library
      const selectedLibrary = libraries[choice - 1];
      buildLibrary(selectedLibrary);
    }

    rl.close();
  });
}

// Run the script
main();