const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage }).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "audioFile", maxCount: 1 },
]);

// ✅ Inline Seeding for Required Categories
const seedCategories = async () => {
  const categories = ["Education", "Hobbies", "Comedy", "Business", "Government"];
  for (const name of categories) {
    const exists = await Category.findOne({ categoryName: name });
    if (!exists) {
      await Category.create({ categoryName: name });
      console.log("Created missing category:", name);
    }
  }
};
seedCategories();

// ✅ Add Podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files?.frontImage?.[0]?.path;
    const audioFile = req.files?.audioFile?.[0]?.path;

    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userData = req.user;

    // Find category case-insensitively
    const categoryDoc = await Category.findOne({
      categoryName: new RegExp(`^${category}$`, "i"),
    });

    if (!categoryDoc) {
      return res.status(400).json({ message: "Category not found" });
    }

    const newPodcast = new Podcast({
      frontImage,
      audioFile,
      title,
      description,
      user: userData._id,
      category: categoryDoc._id,
    });

    await newPodcast.save();

    await Category.findByIdAndUpdate(categoryDoc._id, {
      $push: { podcasts: newPodcast._id },
    });

    await User.findByIdAndUpdate(userData._id, {
      $push: { podcasts: newPodcast._id },
    });

    res.status(200).json({ message: "Podcast added successfully" });
  } catch (error) {
    console.error("Add Podcast Error:", error);
    return res.status(500).json({ message: "Failed to add podcast" });
  }
});

// ✅ Get All Podcasts
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcasts" });
  }
});

// ✅ Get User Podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const data = await User.findById(userData._id)
      .populate({
        path: "podcasts",
        populate: { path: "category" },
      })
      .select("-password");

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcasts" });
  }
});

// ✅ Get Single Podcast
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcast });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcast" });
  }
});

// ✅ Get Podcasts by Category (case-insensitive)
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;

    const categories = await Category.find({
      categoryName: new RegExp(`^${cat}$`, "i"),
    }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });

    let podcasts = [];
    categories.forEach((cat) => {
      podcasts = [...podcasts, ...cat.podcasts];
    });

    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcast" });
  }
});

module.exports = router;
