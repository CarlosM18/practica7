const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const morgan = require('morgan');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'index', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');
app.use(morgan('dev'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server on http://localhost:3000');
});
app.use(require('./routes/index'))
