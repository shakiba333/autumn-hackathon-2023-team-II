const Profile = require("../models/profile");
const User = require('../models/user')

module.exports = {
  index,
  update,
  showOne,
  addFriend
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
        cuisine: req.body.cuisine,
        dish: req.body.dish,
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

async function addFriend(req, res) {
  try {
    const userId = req.params.id
    const friendUserId = req.params.fid
    
    const userAccount = await User.findById(userId)
    const friendAccount = await User.findById(friendUserId)

    const userProfile = await Profile.findById(userAccount.profile);
    const friendProfile = await Profile.findById(friendAccount.profile);

    userProfile.friends.push(friendUserId);
    friendProfile.friends.push(userId);

    await userProfile.save();
    await friendProfile.save();

    res.json(userProfile)
  } catch (err) {
    res.status(500).json({ message: 'Error adding' });
  }
}