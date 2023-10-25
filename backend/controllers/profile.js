const Profile = require("../models/profile");

module.exports = {
  index,
  update,
  showOne,
};

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      res.status(500).json(err);
    });
}

async function update(req, res) {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        diet: req.body.diet,
        health: req.body.health,
        groups: req.body.groups,
      },
      { new: true }
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function showOne(req, res) {
  try {
    const profile = await Profile.findById(req.params.id).populate("groups");
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
}
