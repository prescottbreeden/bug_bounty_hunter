// normally .gitignore this file
const config = {
    development: {
        url: 'http://bughunter.xyz',
        database: {
            multipleStatements: true,
            host: 'localhost',
            user: 'trashpanda',
            password: 'rubberbabybuggybumpers',
            database: 'bug_hunter'
        },
        server: {
            host: '10.0.0.170',
            port: '1337'
        },
        // session: {
        //     secret: "rubberbabybuggybumpers",
        //     name: 'cookie_monster',
        //     proxy: true,
        //     resave: true,
        //     saveUninitialized: true
        // }
    },
    production: {
        url: 'http://bughunter.xyz',
        database: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bug_hunter'
        },
        server: {
            host: '10.0.0.170',
            port: '4200'
        },
        // session: {
        //     secret: "rubberbabybuggybumpers",
        //     name: 'cookie_monster',
        //     proxy: true,
        //     resave: true,
        //     saveUninitialized: true
        // }
    }
};
module.exports = config;
