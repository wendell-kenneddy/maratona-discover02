const Database = require('../db/config');

module.exports = {
  async getJobs() {
    const db = await Database();
    const jobs = await db.all('SELECT * FROM jobs');
    const normalizedJobs = jobs.map(job => {
      return {
        id: job.id,
        name: job.name,
        'daily-hours': job.daily_hours,
        'total-hours': job.total_hours,
        createdAt: job.created_at
      };
    })

    await db.close();

    return normalizedJobs;
  },

  async editJob(job, id) {
    const db = await Database();

    await db.run(
      `UPDATE jobs SET
      name = "${job.name}",
      daily_hours = ${job['daily-hours']},
      total_hours = ${job['total-hours']}
      WHERE id = ${id}`
    )

    await db.close();
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
