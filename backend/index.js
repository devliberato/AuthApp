const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const conn = require("./db/conn")
const userRoutes = require("./routes/userRoutes")
const origin = process.env.ORIGIN


app.use(cors({credentials: true, origin: origin}))


app.use(express.json());

app.use(express.static("public"))

app.use("/users", userRoutes);

app.listen(port, () => {
    console.log("Rodando a aplicação")
})