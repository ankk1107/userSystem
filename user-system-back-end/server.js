const express = require('express');
const db = require('./app/models');
const users = require('./app/routes/users');
const path = require('path')
const bodyParse = require('body-parser');
const app = express();

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // res.header('X-Powered-By', ' 3.2.1');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.use(express.static(path.join(__dirname, 'static'), {
    cacheControl: true,
    maxAge: 60 * 1000
}))

app.use(bodyParse.json());

db.sequelize.sync();

app.use('/users', users)

app.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`服务已启动，端口：${PORT}`)
})

