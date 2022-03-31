import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  POSTGRES_TEST_PASSWORD,
  APP_ENV,
} = process.env

const Client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: APP_ENV === "dev" ? POSTGRES_DB : (POSTGRES_TEST_DB as string),
  user:
    APP_ENV === "dev"
      ? (POSTGRES_USER as string)
      : (POSTGRES_TEST_USER as string),
  password:
    APP_ENV === "dev"
      ? (POSTGRES_PASSWORD as string)
      : (POSTGRES_TEST_PASSWORD as string),
})

//console.log("Client: ", Client)
export default Client
