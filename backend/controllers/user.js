const User = require("../models/user");
const Profile = require("../models/profile");
const Group = require("../models/group");

module.exports = {
  create,
  // login,
};

async function create(req, res) {
  try {
    console.log(req.body);
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
      profile: req.body.profile,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating your user." });
  }
}

// async function login(req, res) {
//   try {
//     const user = await User.findOne({ googleId: req.body.googleId });

//     if (!user) throw new Error();

//     res.json(user);
//   } catch (err) {
//     res.status(400).json("Unable to login");
//   }
// }
