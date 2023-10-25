const Group = require("../models/group");

module.exports = {
  createGroup,
  index,
  showGroup,
  deleteGroup,
  updateGroup,
};

async function createGroup(req, res) {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const groups = await Group.find().populate("meals");

    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateGroup(req, res) {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function showGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id).populate("meals");
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteGroup(req, res) {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
