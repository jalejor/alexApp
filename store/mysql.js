const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
}

let connection;

function handleCon(){
    connection = mysql.createConnection(dbconf);
    connection.connect((e)=>{
        if(e){
            console.error('[db error]',e);
            //setTimeout(handleCon,2);
        }else{
            console.log('DB Connected!')
        }
        
    });

    connection.on('error', e => {
        console.error('[db err]',e);
        if(e.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw e;
        }
    });
}

handleCon();

const list = async (TABLE) => new Promise( (resolve,reject) => {
    connection.query(`SELECT * FROM ${TABLE}`,(error,data)=>{
        if(error) return reject(error);
        resolve(data)
    });
});

const get = async (TABLE,id) => new Promise( (resolve,reject) => {
    connection.query(`SELECT * FROM ${TABLE} WHERE id = '${id}'`,(error,data)=>{
        if(error) return reject(error);
        resolve(data)
    });
});

const upsert = async (table, payload) => new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
        console.log('UPDATE DATA: ', data)
        if (error) {
        return reject(error)
        }
        resolve(data)
    });
});


const remove = async (TABLE,id) => new Promise((resolve,reject)=>{
    connection.query(`DELETE * FROM ${TABLE} WHERE id = '${id}'`,(error,data)=>{
        if(error) return reject(error);
        resolve(data)
    });
});


const query = async (TABLE,query) => new Promise( (resolve, reject) => {
    connection.query(`SELECT * FROM ${TABLE} WHERE ?`,query,(error,result)=>{
        if(error) return reject(error);
        resolve(result[0] || null)
    });
});

module.exports = {
    list,
    get,
    upsert,
    query
};