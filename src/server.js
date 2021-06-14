const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));

// Enables static assets routes
app.use(express.static('public'));
app.use(routes);

// Set the path to search for views to render
app.set('view engine', 'ejs');

// Set the template engine that will render the views
app.set('views', path.resolve(__dirname, 'views'));

// Starts the server
app.listen(3000, () => {
  console.log(`App running at http://localhost:${3000}`)
});
