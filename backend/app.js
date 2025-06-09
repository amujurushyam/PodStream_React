const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user");
const CategoryApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");

require("dotenv").config();
require("./conn/conn");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// All routes
app.use("/api/v1", userApi);
app.use("/api/v1", CategoryApi);
app.use("/api/v1", PodcastApi);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
