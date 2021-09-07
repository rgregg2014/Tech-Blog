//================================REQUIRES========================================
const express = require("express");
const path = require("path");
const routes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const expbhs = require("express-handlebars");
const helpers = require("./utils/helpers");

//=============================CREATE SERVER======================================
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = expbhs.create({ helpers });
// const sess = {
//   secret: process.env.SESSION_PASSWORD,
//   cookie: { expires: 24 * 60 * 60 * 1000 },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({ db: sequelize }),
// };

// app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//===========================START SERVER=========================================

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
