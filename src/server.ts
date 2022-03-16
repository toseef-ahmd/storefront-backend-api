import express from "express"
import bodyParser from "body-parser"


const app : express.Application = express();
const port : string | undefined = process.env.PORT;


app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`)
})


export {app}
