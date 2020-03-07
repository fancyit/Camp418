const path = require('path');
const filesStorage = './questions/';
const fs = require('fs');

const getFiles = (dir, files_) => {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};
const _files = getFiles(filesStorage);
console.log(_files);
console.log(path.parse(_files[0]));

try {
    const data = fs.readFileSync(_files[0], 'utf8');
    console.log(data)
} catch (err) {
    console.error(err)
}


