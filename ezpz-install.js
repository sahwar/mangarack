var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');

if (path.basename(__dirname) !== 'node_modules') {
  console.log('ERROR: The containing folder must be named "node_modules".');
  process.exit(1);
}

fs.readdirSync(__dirname)
  .sort()
  .filter(folderName => folderName !== 'mangarack')
  .concat('mangarack')
  .forEach(function(folderName) {
    if (!/^mangarack/.test(folderName)) return;
    var directoryPath = path.join(__dirname, folderName);
    childProcess.execSync('npm install', {cwd: directoryPath, stdio: [0, 1, 2]});
});
