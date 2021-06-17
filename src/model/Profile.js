const Database = require('../db/config');

module.exports = {
  async getData() {
    const db = await Database();
    const profileData = await db.get(`SELECT * FROM profile`);
    const normalizedData = {
      name: profileData.name,
      avatar: profileData.avatar,
      'monthly-budget': profileData.monthly_budget,
      'days-per-week': profileData.days_per_week,
      'hours-per-day': profileData.hours_per_day,
      'vacation-per-year': profileData.vacation_per_year,
      'hour-value': profileData.hour_value
    }
    await db.close();
    return normalizedData;
  },

  async update(newData) {
    const db = await Database();

    db.run(
      `UPDATE profile SET
      name = "${newData.name}",
      avatar = "${newData.avatar}",
      monthly_budget = ${newData['monthly-budget']},
      days_per_week = ${newData['days-per-week']},
      hours_per_day = ${newData['hours-per-day']},
      vacation_per_year = ${newData['vacation-per-year']},
      hour_value = ${newData['hour-value']}
      `
    );
  }
};
