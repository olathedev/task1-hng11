import express, { Request, Response } from "express"
import router from "./routes/app.route"

const app = express()

const port = 3000

app.use('/api', router)

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" })
})

app.listen(port, () => {
    console.log("server is listening on port 3000");
})