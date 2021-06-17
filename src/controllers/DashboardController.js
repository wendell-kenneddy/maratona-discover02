const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  async getDashboardRoute(req, res) {
    const updatedJobs = await JobUtils.getUpdatedJobs();
    const profile = await Profile.getData();
    let freeHours = 0;
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
      profile: profile,
      updatedJobs,
      statusCount,
      freeHours
    });
  }
}