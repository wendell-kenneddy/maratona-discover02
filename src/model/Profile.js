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

  update(newData) {
    profileData = newData;
  }
};
