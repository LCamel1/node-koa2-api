const Sequelize = require('sequelize')
const initModels = require('../../models/init-models')
const { db_host, db_name, db_user, db_password, db_port, db_dialect } = require('../../config/db.js');

const options = {
    db_host,
    db_dialect,
    define: {
        timestamps: false
    }
}
const sequelize = new Sequelize(db_name, db_user, db_password, options)

module.exports = initModels(sequelize)
