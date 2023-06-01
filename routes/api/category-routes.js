const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//localhost:3001/api/categories/
// find all categories
// be sure to include its associated Products
// C:\Users\bmarc\Desktop\boot_camp\CHALLENGES\Challenge13-E-Commerce_Back_End\seeds\index.js

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //46:20
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
