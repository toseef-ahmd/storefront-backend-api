import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { AppRoutes } from "./routes/index.route"

const app: express.Application = express()
const port: number = process.env.ROOT_APP_PORT as unknown as number


const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200"],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

//Calls the Base Routes through Books handler.
AppRoutes(app)

app.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`)
})

export { app }
