const express = require('express');
const routes = express.Router();

const profile = {
  name: 'Wendell',
  avatar: 'https://avatars.githubusercontent.com/u/72822574?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'hours-per-day': 5,
  __createdAt: Date.now()
}

routes.get('/', (req, res) => res.render('index'));
routes.get('/job', (req, res) => res.render('job'));
routes.get('/job/edit', (req, res) => res.render('job-edit'));
routes.get('/profile', (req, res) => res.render('profile', { profile }));

module.exports = routes;
