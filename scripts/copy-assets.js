const fs = require('fs');
const path = require('path');

// Function to create directories recursively
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy files and directories recursively
function copyRecursively(source, target) {
  // Create target directory if it doesn't exist
  ensureDirectoryExists(target);

  // Read the contents of the source directory
  const items = fs.readdirSync(source);

  // Process each item
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    // Check if it's a directory or a file
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // If it's a directory, call this function recursively
      copyRecursively(sourcePath, targetPath);
    } else {
      // If it's a file, copy it
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// Source and target directories
const sourceDir = path.resolve(__dirname, '../public');
const targetDir = path.resolve(__dirname, '../dist');

// Make sure the target directory exists
ensureDirectoryExists(targetDir);

// Copy files
console.log(`Copying static files from ${sourceDir} to ${targetDir}...`);
copyRecursively(sourceDir, targetDir);
console.log('Static files copied successfully.');
