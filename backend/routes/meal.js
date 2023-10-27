const express = require("express");
const router = express.Router();
const mealCtrl = require("../controllers/meal");

router.post("/", mealCtrl.createMeal);
router.get("/", mealCtrl.index);
router.get("/:id", mealCtrl.showMeal);
// router.put("/:id", mealCtrl.update);
router.delete("/:id", mealCtrl.deleteMeal);
router.delete("/edamam/:id", mealCtrl.deleteMealByEdamamId);

module.exports = router;
