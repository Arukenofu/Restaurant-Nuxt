import pg from 'pg';

const db =  new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'felicita',
    password: 'root',
    port: 9999,
})

db.connect().then(() => {
    console.log('Connected with database');
})

export default db;

