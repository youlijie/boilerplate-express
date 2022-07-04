let express = require('express');
let app = express();

const bodyParser = require("body-parser")

app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const logger = (req, res, next) => {
  const method = req.method
  const path = req.path
  const ip = req.ip
  console.log(`${method} ${path} - ${ip}`)
  next()
}

app.use(logger)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
  console.log(req.body)
})

app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({"message": "HELLO JSON"})
  }
  res.json({"message": "Hello json"})
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
},
  (req, res) => {
    res.json({"time": req.time})
  })

app.get("/:word/echo", (req, res) => {
  const params = req.params
  res.json({"echo": params.word})
  console.log(params)
})

app.post("/name", (req, res) => {
  const {first, last} = req.body
  res.json({"name": `${first} ${last}`})
})


























 module.exports = app;
