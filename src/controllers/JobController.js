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

  async getJobEditRoute(req, res) {
    const jobs = await Jobs.getJobs();
    const profile = await Profile.getData();
    const jobId = req.params.id;
    const job = jobs.find(job => job.id === Number(jobId));

    if (!job) return res.send('Error: Job not found');

    job.budget = job['total-hours'] * profile['hour-value'];
    return res.render('job-edit', { job });
  },

  async postJobEditRoute(req, res) {
    const jobId = req.params.id;
    const jobs = await Jobs.getJobs();
    const job = jobs.find(job => job.id === Number(jobId));

    if (!job) return res.send('Error: Job not found');

    const updatedJob = {
      ...job,
      name: req.body.name || 'Nome não especificado',
      'total-hours': req.body['total-hours'] || 0,
      'daily-hours': req.body['daily-hours'] || 0,
    };

    await Jobs.editJob(updatedJob, jobId);
    return res.redirect('/job/' + jobId);
  },

  async postJobDeleteRoute(req, res) {
    const jobId = req.params.id;
    await Jobs.deleteJob(jobId);
    return res.redirect('/');
  }
}
