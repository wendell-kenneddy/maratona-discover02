const Database = require('../db/config');

module.exports = {
  getData() {
    return profileData;
  },

  update(newData) {
    profileData = newData;
  }
};
