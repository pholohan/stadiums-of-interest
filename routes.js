const Accounts = require('./app/controllers/accounts');
const Stadiums = require('./app/controllers/stadiums');
const Gallery = require('./app/controllers/gallery');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'POST', path: '/contribute', config: Stadiums.contribute },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    { method: 'GET', path: '/editstadium/{id}', config: Stadiums.showStadium },
    { method: 'POST', path: '/editstadium/{id}', config: Stadiums.updateStadium },
    { method: 'GET', path: '/deletestadium/{id}', config: Stadiums.deleteStadium },
    { method: 'POST', path: '/uploadfile', config: Gallery.uploadFile },
    { method: 'GET', path: '/home', config: Stadiums.home },
    { method: 'GET', path: '/report', config: Stadiums.report },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: {auth: false}
    }
];