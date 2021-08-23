const path = require("path");
const express = require("express");
const expbhs = require("express-handlebars");

// const routes = require("./controllers");
// const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// const hbs = expbhs.create({});

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
