const Profile = require('../model/Profile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
  async getProfileRoute(req, res) {
    return res.render('profile', { profile: await Profile.getData() })
  },

  async postProfileRoute(req, res) {
    const profile = await Profile.getData();

    await Profile.update({
      // Fallbacks to the original data if some is missing.
      ...profile,
      ...req.body,
      'hour-value': ProfileUtils.calculateHourValue(req.body)
    });
    return res.redirect('/');
  }
};
