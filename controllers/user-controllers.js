const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res){},
    // get user by id
    getUserById({ params }, res){},
    // create new user
    createUser({ body }, res){},
    // edit existing user by id
    updateUser({ params, body}, res){},
    // remove user by id
    removeUser({ params }){}
}

module.exports = userController;