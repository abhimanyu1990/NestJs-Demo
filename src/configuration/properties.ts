const config = {
    "development": {
        "redis": {
            "name": 'test',
            "readOnly": true,
            "host": "localhost",
            "port": 6379,
            "client_name": "demo"
        },

        "ormConfig": {
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "postgres",
            "database": "boilerplate",
            "synchronize": true,
            "logging": true,
            "entities": [
                "dist/**/*.entity{.ts,.js}"
            ],
            "migrations": [
                "dist/migration/**/*{.ts,.js}"
            ],
            "subscribers": [
                "dist/subscriber/**/*{.ts,.js}"
            ]
        },
        "emailConfig": {
            "transport": {
                "host": "smtp.ethereal.email",
                "port": 587,
                "secure": false,
                "auth": {
                    "user": "ola.conroy@ethereal.email",
                    "pass": "a3PFUSrpMxJhuhrRmT"
                }
            }
        },
        "accountVerificationEmail":{
            "subject":"Account Verification Email",
            "fromEmail": "noreply@nestjs.com",
            "emailBody": "To verify your account click on the $url"
        },
        "server":{
            "host":"localhost",
            "port":3000
        }
    },
    "production": {}
}

export default config;
