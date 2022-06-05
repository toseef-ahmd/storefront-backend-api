import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
  POSTGRES_HOST_DEV,
  POSTGRES_DB_DEV,
  POSTGRES_USER_DEV,
  POSTGRES_PASSWORD_DEV,
  POSTGRES_HOST_PROD,
  POSTGRES_DB_PROD,
  POSTGRES_USER_PROD,
  POSTGRES_PASSWORD_PROD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  POSTGRES_TEST_PASSWORD,
  APP_ENV,

} = process.env

const host : string = APP_ENV === "dev" ? (POSTGRES_HOST_DEV as string) : (POSTGRES_HOST_PROD as string);

const database: string =  APP_ENV === "dev" ? POSTGRES_DB_DEV as string
: APP_ENV === "prod" ? (POSTGRES_DB_PROD as string) 
: (POSTGRES_TEST_DB as string)

const user: string =  APP_ENV === "dev"
          ? (POSTGRES_USER_DEV as string)
          : APP_ENV === "prod" ? (POSTGRES_USER_PROD as string)
          : (POSTGRES_TEST_USER as string)

const password: string = APP_ENV === "dev"
          ? (POSTGRES_PASSWORD_DEV as string)
          : APP_ENV === "prod" ? (POSTGRES_PASSWORD_PROD as string)
          : (POSTGRES_TEST_PASSWORD as string)

console.log(host)
console.log(database)
console.log(user)
console.log(password)

const Client: Pool = new Pool({
  host: host,
  database: database,
  user: user,
  password: password
})

//console.log("Client: ", Client)
export default Client
