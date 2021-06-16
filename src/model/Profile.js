let profileData = {
  name: 'Wendell',
  avatar: 'https://avatars.githubusercontent.com/u/72822574?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'hours-per-day': 5,
  'hour-value': 50
};

module.exports = {
  getData() {
    return profileData;
  },

  update(newData) {
    profileData = newData;
  }
};
