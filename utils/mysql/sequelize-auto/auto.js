// utils/mysql/sequelize-auto/auto.js
const SequelizeAuto = require('sequelize-auto')

const { db_host, db_name, db_user, db_password, db_port, db_dialect } = require('../../../config/db.js');

const options = {
    host: db_host,
    dialect: db_dialect,
    directory: 'models',
    port: db_port,
    additional: {
        timestamps: false
    }
}

// const logsInfo = require("../../../utils/logs.js").logInfo
// logsInfo(options)

const auto = new SequelizeAuto(db_name, db_user, db_password, options)

auto.run(err => {
    if (err) {
        throw err
    }
})