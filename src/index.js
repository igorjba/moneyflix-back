const app = require("./app")

const port = process.env.PORT || 3000
app.listen(port)


/*
const routes = require("./Routes/index")

app.use(routes)

app.listen(process.env.PORT || 3000)*/