const config = {
    "development": {
        "redis": {
            "name":'test',
            "readOnly":true,
            "host": "192.168.0.117" ,
            "port": 6379,
            "client_name":"demo"
        },

        "ormConfig":{
            "type": "postgres",
            "host": "192.168.0.117",
            "port": 5432,
            "username": "postgres",
            "password": "admin",
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
