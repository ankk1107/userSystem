const express = require('express');
const db = require('../models');
const uuid = require('uuid');

var router = express.Router();

router.get('/', async (req, res) => {
    const [results, metadata] = await db.sequelize.query('select * from users', { type: db.sequelize.QueryTypes.SELECT })
    console.log(results);

    res.json(results);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const [results, metadata] = await db.sequelize.query('select * from users where id = :id', { replacements: { id: id }, type: db.sequelize.QueryTypes.SELECT })
    console.log(results);
    res.json(results)
})

router.post('/', async (req, res) => {
    const { username: name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: '请输入完整的信息' })
    }
    const alreadyExist = await db.sequelize.query('select * from users where email = :email',
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { email: email }
        }
    )
    if (alreadyExist.length > 0) {
        console.log('邮箱已被注册lreadyExist: ')
        return res.status(400).json({ message: '邮箱已被注册' })
    }

    const newId = uuid.v4();
    const now = new Date().getTime();
    const ip = req.ip;
    const result = await db.sequelize.query('insert into users (id, name, email, password, register_timestamp, last_login_timestamp, ip) values (:newId, :name, :email, :password, :now, :now, :ip)',
        {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: {
                newId: newId,
                name: name,
                email: email,
                password: password,
                now: now,
                ip: ip
            }
        })
    res.json({ message: '注册成功' })
})

router.post('/login', async (req, res) => {
    console.log('login：', req.body, req.cookies)
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: '请输入完整的信息' })
    }
    const result = await db.sequelize.query('select * from users where name = :username and password = :password',
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { username: username, password: password }
        }
    )
    if (result.length > 0) {
        res.cookie('username', username, { maxAge: 1000 * 60 * 60}); // 设置cookie
        res.json({ message: '登录成功' })
    } else {
        res.status(400).json({ message: '用户名或密码错误' })
    }
})

module.exports = router;