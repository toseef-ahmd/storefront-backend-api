import express from "express"
import bodyParser from "body-parser"

import { AppRoutes } from "./routes/index.route"

const app: express.Application = express()
const port: number = process.env.ROOT_APP_PORT as unknown as number

app.use(bodyParser.json())

//Calls the Base Routes through Books handler.
AppRoutes(app)

// const CorsOptions = {
//   origin: "localhost:8000",
//   optionsSuccessStatus: 200,
// }

app.listen(port, () => {
  console.log(`Server has been started on http://localhost:${port}`)
})

export { app }