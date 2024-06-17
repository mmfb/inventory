var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieSession = require('cookie-session');
var settings = require("./config/settings.json").server;
var app = express();


app.use(cookieSession({
    name: 'session',
    secret: settings.cookieSecret,
    maxAge: settings.maxAge
  }))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www')));

const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('views', './views');
app.set('view engine', 'hbs');

app.get(['/','/index.html'], (req, res) => { res.render('index'); });
app.get('/storage.html', (req, res) => { res.render('storage'); });

const usersRouter = require("./routes/usersRoutes");
const storageRouter = require("./routes/storageRoutes");

app.use("/api/users",usersRouter);
app.use("/api/storages",storageRouter);

// when we don't find anything
app.use((req, res, next) => {
    res.status(404).send({ msg: "No resource or page found." });
})

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err);
})

const port = parseInt(process.env.port || settings.port);
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});