let jobs = [
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

module.exports = {
  getJobs() {
    return jobs;
  },

  editJob(job, index) {
    jobs[index] = job;
  },

  deleteJob(job, index) {
    if (index === -1) return;

    jobs.splice(index, 1);
  },

  addJob(job) {
    jobs.push(job);
  },
}
