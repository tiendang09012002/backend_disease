const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const corsOptions = {
    origin: "*",

}
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use("/static", express.static(config.app.static_folder))
app.set("views", `${__dirname}/../resources/views`);
app.set("view engine", "ejs");

app.use(config.get("app.prefixApiVersion"), require(`${__dirname}/../routers/web`));
module.exports = app;
