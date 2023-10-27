const express = require("express");
const router = express.Router();
const groupCtrl = require("../controllers/group");

router.post("/", groupCtrl.createGroup);
router.get("/", groupCtrl.index);
router.get("/:id", groupCtrl.showGroup);
router.put("/:id", groupCtrl.updateGroup);
router.delete("/:id", groupCtrl.deleteGroup);

module.exports = router;
