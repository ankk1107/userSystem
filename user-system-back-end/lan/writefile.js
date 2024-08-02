const fs = require('fs');

const data = JSON.parse(fs.readFileSync('untranslation/en.json', 'utf8'));

fs.readdir('./translated', (err, files) => {
    files.forEach(file => {
        const originData = JSON.parse(fs.readFileSync(`./translated/${file}`, 'utf8'));
        Object.keys(data).forEach(key => {
            if(originData[key] === undefined) {
                originData[key] = data[key];
            }
        });


        fs.writeFile(`./dist/${file}`, JSON.stringify(originData), err => {
            if (err) {
                console.error(err);
            }
        });
    })
})
