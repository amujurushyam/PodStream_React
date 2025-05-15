const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const user = require("../models/user");
const Podcast = require("../models/podcast");
const router = require("express").Router();

// add podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const { user } = req;
    const Category = await Category.findOne({ categoryName: category });
    if (!Category) {
      return res.status(400).json({ message: "Category not found" });
    }
    const CategoryId = Category._id;
    const userid = user._id;
    const newPodcast = new Podcast({
      frontImage,
      audioFile,
      title,
      description,
      user: userid,
      category: CategoryId,
    });
    await newPodcast.save();
    await Category.findByIdAndUpdate(CategoryId, {
      $push: { podcasts: newPodcast._id },
    });
    await user.findByIdAndUpdate(userid, {
      $push: { podcasts: newPodcast._id },
    });
    res.status(200).json({ message: "Podcast added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add podcast" });
  }
});

// get all podcasts
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

// get user podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userid = user._id;
    const data = await user
      .findById(userid)
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

// get podcast by id
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcast });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcast" });
  }
});

// get podcasts by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const categories = await Category.find({ categoryName: category }).populate(
      {
        path: "podcasts",
        populate: { path: "category" },
      }
    );
    let podcasts = [];
    categories.forEach((category) => {
      podcasts = [...podcasts, ...category.podcasts];
    });
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get podcast" });
  }
});

module.exports = router;
