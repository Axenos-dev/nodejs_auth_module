const express = require('express')
const signup = require('../controllers/user-controller-sign-up.js')
const signin = require('../controllers/user-controller-sign-in.js')
const getprofile = require('../controllers/user-controller-get-profile.js')
const bcrypt = require("bcrypt")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/auth/sign-up", async (req: Request, res: any) => {
    const result = await signup(req.body)

    res.json(result)
})

app.post("/auth/sign-in", async (req: Request, res: any) => {
    const result = await signin(req.body)

    res.json(result)
})

app.get("/auth/profile", async (req: Request, res: any) => {
    const result = await getprofile(req.body)

    res.json(result)
})

app.listen(5050, (err: Error)=>{
    if (err) console.error(err)

    console.log("Started on port :5050")
})