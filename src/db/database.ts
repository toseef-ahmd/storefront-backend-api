import dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config()

const {
    POSTGRESS_HOST,
    POSTGRESS_DB,
    POSTGRESS_USER,
    POSTGRESS_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PASSWORD,
    ENV,
} = process.env


const Client : Pool = new Pool({
    host :  POSTGRESS_HOST,
    database : ENV === 'dev' ? POSTGRESS_DB : POSTGRES_TEST_DB,
    user:  ENV ==='dev' ? POSTGRESS_USER : POSTGRES_TEST_USER,
    password : ENV ==='dev' ? POSTGRESS_PASSWORD : POSTGRES_TEST_PASSWORD
})

export default Client