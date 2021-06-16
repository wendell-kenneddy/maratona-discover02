const Profile = require('../model/Profile');
const Jobs = require('../model/Jobs');

module.exports = {
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
    return job['total-hours'] * Profile.getData()['hour-value'];
  },

  getUpdatedJobs() {
    return Jobs.getJobs().map(job => {
      const remainingDays = this.getJobRemainingDays(job);

      return {
        ...job,
        remainingDays,
        status: remainingDays <= 0 ? 'done' : 'progress',
        budget: this.calculateJobBudget(job)
      };
    });
  },

  createJob(data) {
    const lastJobId = Jobs.getJobs()[Jobs.getJobs().length - 1]?.id || 0;
    const job = {
      id: lastJobId + 1,
      name: data.name,
      'daily-hours': data['daily-hours'],
      'total-hours': data['total-hours'],
      createdAt: Date.now()
    };
    return job;
  },

  getJobIndexById(id) {
    const job = Jobs.getJobs().find(job => job.id === id);
    const jobIndex = Jobs.getJobs().indexOf(job);
    return jobIndex;
  }
}
