import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { AppRoutes } from "./routes/index.route"

const app: express.Application = express()
const port: number = process.env.PORT as unknown as number || 8000
const env: string = process.env.APP_ENV as unknown as string

console.log(env)
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
