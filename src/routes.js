const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const DashboardController = require('./controllers/DashboardController');
const JobController = require('./controllers/JobController');

routes.get('/', DashboardController.getDashboardRoute);
routes.get('/job', JobController.getJobRoute);
routes.post('/job', JobController.postJobRoute);
routes.get('/job/:id', JobController.getJobEditRoute);
routes.post('/job/:id', JobController.postJobEditRoute);
routes.post('/job/delete/:id', JobController.postJobDeleteRoute);
routes.get('/profile', ProfileController.getProfileRoute);
routes.post('/profile', ProfileController.postProfileRoute);

module.exports = routes;
