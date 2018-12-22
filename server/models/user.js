module.exports = class userSchema {

    constructor() {

        this.Schema = {
            id: ['INTEGER', 'AUTO_INCREMENT', 'PRIMARY KEY'],
            first_name: ['VARCHAR(255)', 'NOT NULL'],
            last_name: ['VARCHAR(255)', 'NOT NULL'],
            email: ['VARCHAR(255)', 'NOT NULL', 'UNIQUE'],
            password: ['VARCHAR(255)', 'NOT NULL'],
            created_at: ['TIMESTAMP', 'DEFAULT NOW()'],
            updated_at: ['TIMESTAMP', 'DEFAULT NOW()', 'ON UPDATE NOW()']
        }
    }
}
