const express = require("express")
const app = express()


const artistRouter  = require("./routes/artist.router")

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/v1/artist", artistRouter)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Serveur running...")
})