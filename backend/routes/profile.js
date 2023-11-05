const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");

router.get("/", profileCtrl.index);
router.get("/:id", profileCtrl.showOne);
router.put("/:id", profileCtrl.update);
router.post('/:id/friends/:fid', profileCtrl.addFriend)
router.delete('/:id/friends/:fid', profileCtrl.deleteFriend)

module.exports = router;
