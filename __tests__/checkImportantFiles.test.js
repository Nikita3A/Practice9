const path = require('path');
const chai = require('chai');
chai.use(require('chai-fs'));

const listOfImportantFiles = [
    '../package-lock.json',
    '../package.json',
    '../.eslintrc.js',
    '../.gitignore',
    '../.editorconfig',
    '../README.md',
];

test('Checking important files', () => {
    listOfImportantFiles.forEach((importantFile) => {
        chai.expect(path.join(__dirname, importantFile)).to.be.a.path();
    });
});
