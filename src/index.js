const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path')


app.set("port", process.env.PORT || 3000);

// Configuramos el uso de archivos .hbs
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs')

// MiddleWares

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// Routes
app.use(require('./routes/index'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Seteamos el puerto
app.listen(app.get("port"), () => {
    console.log(`servidor Stripe activo en puerto ${app.get("port")}`);
  });