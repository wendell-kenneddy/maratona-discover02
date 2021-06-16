module.exports = {
  calculateHourValue(data) {
    const weeksPerYear = 52;

    // Subtracts the weeks dedicated to vacation from the total weeks in a
    // year, resulting in the real work weeks in a year.
    const workWeeksPerYear = weeksPerYear - data['vacation-per-year'];

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
};
