const { User } = require('../models');

const userData = [{
        username: 'John',
        password: 'john',
        email: "john@john.com"
    },
    {
        username: 'Jake',
        password: 'jake',
        email: "jake@jake.com"
    },
    {
        username: 'Joe',
        password: 'joe',
       email: "joe@joe.com"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;