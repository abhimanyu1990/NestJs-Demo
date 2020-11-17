const config = {
    "development": {
        "redis": {
            "name":'test',
            "readOnly":true,
            "host": "localhost" ,
            "port": 6379,
            "client_name":"demo"
        },

        "ormConfig":{
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
        }
    },
    "production": {}
}

export default config ;
