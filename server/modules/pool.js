const pg = require('pg');

const config = {
    database:'weekend-to-do-app',
    host:'localhost',
    port:5432,
    max:10,
    iddletimeoutMillis:30000
};

const pool=new pg.Pool(config);

pool.on("connect", ()=>{
    console.log('connected to postgress');
});

pool.on("error", (err)=>{
    console.log('error on connecting to postgress',err)
});

module.exports = pool;