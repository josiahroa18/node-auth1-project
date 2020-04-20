const db = require('../../data/dbConfig');

module.exports = {
    getById,
    addUser,
    getBy,
    getUsers
}

function getBy(username){
    return db('users').where({ username }).first();
}

function getById(id){
    return db('users')
        .where({ id })
        .first();
}

function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(id => {
            return getById(id[0]);
        })
}

function getUsers(){
    return db('users');
}