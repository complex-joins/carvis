const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const PRIVATE_DIR = path.join(__dirname, '/../../carvis-private-info');
console.log(PRIVATE_DIR);
makePrivateDirsIfNeeded();
let fileDirectory = fs.readdirSync(PRIVATE_DIR);
updatePrivateDirectory(fileDirectory);
fileDirectory = fileDirectory.filter((file) => file[0] !== '.');
fileDirectory.forEach((file) => {
  let currentFile = path.join(PRIVATE_DIR, `/${file}`);
  let filePath = fs.readFileSync(currentFile)
  .toString()
  .split('\n')[0]
  .replace(/\/\//, '')
  .trim();
  console.log(filePath);
  fs.createReadStream(currentFile).pipe(fs.createWriteStream(path.join(__dirname, `/../${filePath}`)));
});

function makePrivateDirsIfNeeded() {
  let searchDir = path.join(__dirname, '/../../');
  let thisDir = path.join(__dirname, '/../');
  if (fs.readdirSync(thisDir).indexOf('secret') === -1) {
    shell.exec('mkdir secret');
  }
  if (fs.readdirSync(searchDir).indexOf('carvis-private-info') === -1) {
    shell.cd('..');
    shell.exec('git clone https://github.com/alexcstark/carvis-private-info.git');
    shell.exec('git remote add upstream https://github.com/alexcstark/carvis-private-info.git');
    shell.cd('carvis-private-info');
  }
}
function updatePrivateDirectory(directory) {
  console.log(directory);
  let pwd = shell.pwd();
  shell.cd('../carvis-private-info');
  shell.exec('git pull origin master');
  shell.cd(pwd);
}
