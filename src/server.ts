import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { AppRoutes } from "./routes/index.route"

const app: express.Application = express()
const port: number = process.env.PORT as unknown as number || 8000
const env: string = process.env.APP_ENV as unknown as string
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
console.log(env)
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

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json())

//Calls the Base Routes through Books handler.
AppRoutes(app)

app.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`)
})

export { app }
