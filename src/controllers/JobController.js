const Jobs = require("../model/Jobs");
const { createJob } = require("../utils/JobUtils");
const Profile = require('../model/Profile');

module.exports = {
  getJobRoute(req, res) {
    return res.render('job');
  },

  async postJobRoute(req, res) {
    const job = createJob(req.body);
    await Jobs.addJob(job);
    return res.redirect('/');
  },

  getJobEditRoute(req, res) {
    const jobId = req.params.id;
    const job = Jobs.getJobs().find(job => job.id === Number(jobId));

    if (!job) return res.send('Error: Job not found');

    job.budget = calculateJobBudget(job);
    return res.render('job-edit', { job });
  },

  postJobEditRoute(req, res) {
    const jobId = req.params.id;
    const job = Jobs.getJobs().find(job => job.id === Number(jobId));

    if (!job) return res.send('Error: Job not found');

    const jobIndex = Jobs.getJobs().indexOf(job);
    const updatedJob = {
      ...job,
      name: req.body.name || 'Nome não especificado',
      'total-hours': req.body['total-hours'] || 0,
      'daily-hours': req.body['daily-hours'] || 0,
    };

    Jobs.editJob(updatedJob, jobIndex);
    return res.redirect('/job/' + jobId);
  },

  postJobDeleteRoute(req, res) {
    const jobId = req.params.id;
    Jobs.deleteJob(JobUtils.getJobIndexById(jobId));
    return res.redirect('/');
  }
}
