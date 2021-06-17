const Profile = require('../model/Profile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
  async getProfileRoute(req, res) {
    return res.render('profile', { profile: await Profile.getData() })
  },

  postProfileRoute(req, res) {
    Profile.update({
      // Fallbacks to the original data if some is missing.
      ...Profile.getData(),
      ...req.body,
      'hour-value': ProfileUtils.calculateHourValue(req.body)
    });
    return res.redirect('/');
  }
};
