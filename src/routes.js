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

routes.get('/', Jobs.controllers.getIndexRoute);
routes.get('/job', Jobs.controllers.getJobRoute);
routes.post('/job', Jobs.controllers.postJobRoute);
routes.get('/job/:id', Jobs.controllers.getJobEditRoute);
routes.post('/job/:id', Jobs.controllers.postJobEditRoute);
routes.post('/job/delete/:id', Jobs.controllers.postJobDeleteRoute);
routes.get('/profile', Profile.controllers.getProfileRoute);
routes.post('/profile', Profile.controllers.postProfileRoute);

module.exports = routes;
