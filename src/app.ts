import express, { type Application, type Request, type Response } from "express"
const app: Application = express()
import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

app.use(express.json())

app.use("/api", userRouter)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authRoute)


app.get('/', (req: Request, res: Response) => {

    const d = {
      id : 5,
      "name": "Fahim Rahman",
      "email": "fahim@gmail.com",
      "age": 27,
      "role": "user",
      "isActive": false
    }


  res.send({
        success: true,
        message: "This is root route",
        author: "PH",
        data: d
  })
})


export default app