const User = require("../models/user");
const Profile = require("../models/profile");
const Group = require("../models/group");

module.exports = {
  create,
  show
};

async function create(req, res) {
  try {
    const user = await User.findOne({ googleId: req.body.googleId });

    if (user) {
      res.status(200).json(user);
      return;
    }

    const newGroup = await Group.create(req.body);
    req.body.groups = [newGroup._id];

    const newProfile = await Profile.create(req.body);
    req.body.profile = newProfile._id;

    let newUser = await User.create({
      googleId: req.body.googleId,
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.picture,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating your user." });
  }
}

async function show(req, res) {
  const userEmail = req.params.email
  const user = await User.findOne({ email: userEmail })
          .populate({
              path: 'profile',
              populate: { path: 'groups', model: 'Group'}
          })
  res.json(user);
}

