const User = require("../models/user");

module.exports = {
  create,
  login,
};

async function create(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const profile = await Profile.findOne({ username: req.body.username });

    if (user) {
      res.status(500).json({ error: "Email already in use." });
    } else if (profile) {
      res.status(500).json({ error: "Username not available." });
    }

    const newProfile = await Profile.create(req.body);
    req.body.profile = newProfile._id;
    let newUser = await User.create(req.body);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating your user." });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error();

    // need to write logic for login

    res.json(user);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}
