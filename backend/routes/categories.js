const router = require("express").Router();
const Category = require("../models/category");

router.post("/add-category", async (req, res) => {
  const { categoryName } = req.body;
  const newCategory = new Category({ categoryName });
  await newCategory.save();
  res.status(200).json({ message: "Category added successfully" });
});
module.exports = router;
