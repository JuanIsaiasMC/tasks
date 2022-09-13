const { Tasks } = require("../models/tasks.models");
const { Users } = require("../models/users.models");

const initModels = () => {
    Users.hasMany(Tasks, { foreignKey: 'userId' })
    Tasks.belongsTo(Users)


}
module.exports = { initModels }