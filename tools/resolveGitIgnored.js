const fs = require('fs');
const path = require('path');

const PRIVATE_DIR = path.join(__dirname, '/../../carvis-private-info');

let fileDirectory = fs.readdirSync(PRIVATE_DIR);
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
