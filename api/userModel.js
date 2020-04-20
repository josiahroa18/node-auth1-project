const db = require('../data/dbConfig');

module.exports = {
    getById,
    addUser
}

function getById(id){
    console.log(id);
    return db('users')
        .where({id})
        .first();
}

function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(id => {
            return getById(id[0]);
        })
}