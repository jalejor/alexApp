# nodeBackend

`npm install`

# DB Migrations Notes

`npm i mysql --save`
`sudo npm i -g db-migrate`
`sudo npm i db-migrate-mysql --save`

Create following dirs:
    config 
    migrations

Create dev.json, test.json, prod.json in config directory:
```
{
    "dev":{
        "host":"127.0.0.1",
        "user":"root",
        "password":"Converse04?",
        "database":"nodePractico",
        "driver":"mysql",
        "multipleStatements": true
    },"sql-file" : true
}
```

Create the first migration 
`db-migrate create TABLE --config ./config/dev.json`

Dev Migration 
`db-migrate up -c `