const express = require('express');
const routes = express.Router();

class Profile {
  static data = {
    name: 'Wendell',
    avatar: 'https://avatars.githubusercontent.com/u/72822574?v=4',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'hours-per-day': 5,
    'hour-value': 50
  }

  static controllers = {
    getProfileRoute(req, res) {
      return res.render('profile', { profile: Profile.data })
    },

    postProfileRoute(req, res) {
      Profile.services.updateProfile(req.body);
      return res.redirect('/');
    }
  }

  static services = {
    updateProfile(data) {
      Profile.data = {
        // Fallbacks to the original data if some is missing.
        ...Profile.data,
        ...data,
        'hour-value': Profile.services.calculateHourValue(data)
      };
    },

    calculateHourValue(data) {
      const weeksPerYear = 52;

      // Subtracts the weeks dedicated to vacation from the total weeks in a
      // year, resulting in the real work weeks in a year.
      const workWeeksPerYear = 52 - data['vacation-per-year'];

      // Multiplies the work hours per day by the days dedicated to work in a
      // week, resulting in the total work hours in a week.
      const weekTotalWorkHours = data['hours-per-day'] * data['days-per-week'];

      const weeksPerMonth = workWeeksPerYear / 12;
      const monthlyWorkHours = weekTotalWorkHours * weeksPerMonth;

      // The hour value is calculated by dividing the expected monthly gain by
      // the work hours in a month. 
      const hourValue = data['monthly-budget'] / monthlyWorkHours;
      return hourValue;
    }
  }
}

class Jobs {
  static data = [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 60,
      createdAt: Date.now()
    },

    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 3,
      'total-hours': 17,
      createdAt: Date.now()
    }
  ];

  static controllers = {
    getIndexRoute(req, res) {
      const updatedJobs = Jobs.services.getUpdatedJobs();
      const concludedJobsTotal = updatedJobs.filter(e => e.status === 'done').length;
      const inProgressJobsTotal = updatedJobs.length - concludedJobsTotal;

      res.render('index', {
        updatedJobs,
        concludedJobsTotal,
        inProgressJobsTotal
      });
    },

    getJobRoute(req, res) {
      return res.render('job');
    },

    postJobRoute(req, res) {
      const lastJobId = Jobs.data[Jobs.data.length - 1]?.id || 0;

      const job = {
        id: lastJobId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        createdAt: Date.now()
      };

      Jobs.data.push(job);
      return res.redirect('/');
    },

    getJobEditRoute(req, res) {
      const jobId = req.params.id;
      const job = Jobs.data.find(job => job.id === Number(jobId));

      if (!job) return res.send('Error: Job not found');

      job.budget = Jobs.services.calculateJobBudget(job);
      return res.render('job-edit', { job });
    },

    postJobEditRoute(req, res) {
      const jobId = req.params.id;
      const job = Jobs.data.find(job => job.id === Number(jobId));

      if (!job) return res.send('Error: Job not found');

      const jobIndex = Jobs.data.indexOf(job);
      const updatedJob = {
        ...job,
        name: req.body.name || 'Nome não especificado',
        'total-hours': req.body['total-hours'] || 0,
        'daily-hours': req.body['daily-hours'] || 0,
      };

      Jobs.data[jobIndex] = updatedJob;
      return res.redirect('/job/' + jobId);
    },

    postJobDeleteRoute(req, res) {
      const jobId = req.params.id;
      Jobs.data = Jobs.data.filter(job => Number(job.id) !== Number(jobId));
      return res.redirect('/');
    }
  }

  static services = {
    getJobRemainingDays(job) {
      const dayInMS = 1000 * 60 * 60 * 24;

      // Divides the estimated hours to complete the project by the hours that
      // will be daily spent in the job. For example: 20 total hours / 2 daily
      // hours would result in 10 days.
      const daysToComplete = (job['total-hours'] / job['daily-hours']).toFixed();
      const createdAtDate = new Date(job.createdAt);

      // Adds the estimated days to the creation date, resulting in the day that
      // the job will due.
      const dueDate = createdAtDate.getDate() + Number(daysToComplete);

      // Sets the date of due in milliseconds, also calculating the month day.
      const dueDateInMs = createdAtDate.setDate(dueDate);

      // Subtracts the current date of the due date, resulting in the total days
      // passed from the job creation, in milliseconds.
      const passedDaysInMS = dueDateInMs - Date.now();
      const passedDays = Math.floor(passedDaysInMS / dayInMS);

      return passedDays;
    },

    calculateJobBudget(job) {
      return job['total-hours'] * Profile.data['hour-value'];
    },

    getUpdatedJobs() {
      return Jobs.data.map(job => {
        const remainingDays = Jobs.services.getJobRemainingDays(job);

        return {
          ...job,
          remainingDays,
          status: remainingDays <= 0 ? 'done' : 'progress',
          budget: Jobs.services.calculateJobBudget(job)
        };
      });
    }
  }
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
