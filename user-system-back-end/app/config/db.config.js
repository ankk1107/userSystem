module.exports = {
    HOST: 'localhost',
    USER: 'sa',
    PASSWORD: 'xxxxxx',
    DB: 'userDB',
    PORT: 1433,
    dialect: 'mssql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}