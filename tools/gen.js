const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const fileNameFromFilePath = (path) => path.split('/').pop();
function copyDirectoryContents(sourceDir, targetDir) {

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied file: ${fileNameFromFilePath(sourcePath)} -> ${targetPath}`);
    } else {
      copyDirectoryContents(sourcePath, targetPath);
      console.log(`Copied directory: ${fileNameFromFilePath(sourcePath)} -> ${targetPath}`);
    }
  });
}

function getNamePropertyFromPackageJsonFile(packageJsonPath) {
  const packageJson = require(packageJsonPath);
  return packageJson.name;
}
function changeNamePropertyInPackageJsonFile(packageJsonPath, newName) {
  const packageJson = require(packageJsonPath);
  packageJson.name = newName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

const scopeName = getNamePropertyFromPackageJsonFile(path.join(__dirname, '..', 'package.json'));

program
  .argument('type', 'template type (basic | nest)')
  .argument('name', 'name for the generated file')
  .parse(process.argv);

const templateFolderPath = path.join(__dirname, '/templates');
const outputFolderPath = path.join(__dirname, '..', '/packages');

if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}
const [type, name] = program.args;
const newPackagePath = path.join(outputFolderPath, `${type}-${name}`);


switch (type) {
  case "basic":
    copyDirectoryContents(path.join(templateFolderPath, 'basic-npm-package'), newPackagePath);
    break
  case "nest":
    copyDirectoryContents(path.join(templateFolderPath, 'nest-module'), newPackagePath);
    break;
}

changeNamePropertyInPackageJsonFile(path.join(newPackagePath, 'package.json'), `@${scopeName}/${type}-${name}`)
