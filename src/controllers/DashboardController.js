const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  getDashboardRoute(req, res) {
    const updatedJobs = JobUtils.getUpdatedJobs();
    let freeHours = Profile.getData()['hours-per-day'];
    let statusCount = {
      total: updatedJobs.length,
      progress: 0,
      done: 0
    }

    for (const job of updatedJobs) {
      statusCount[job.status] += 1;

      if (job.status === 'progress') freeHours -= Number(job['daily-hours']);
    }

    res.render('index', {
      profile: Profile.getData(),
      updatedJobs,
      statusCount,
      freeHours
    });
  }
}