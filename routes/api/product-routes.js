const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

//localhost:3001/api/products/ -> GET (ACCESS)
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
// localhost:3001/api/products/4 (Top 40 Music Compilation Vinyl Record)
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: "No category found with that id!" });
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
//localhost:3001/api/products/ -> POST (CREATE)
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    // console.log({ productData });
    if (req.body.tagIds.length) {
      // console.log(req.body.tagIds);
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        // console.log({ tag_id });
        // map is a for loop (array) it goes one by one in the array
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      // console.log({ productTagIdArr });

      const result = await ProductTag.bulkCreate(productTagIdArr);
      // console.log({ result });
      return res.status(200).json(result);
    }
    // if no product tags, just respond
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
// localhost:3001/api/products/17 -> PUT (UPDATE)
router.put("/:id", async (req, res) => {
  // update product data
  const productData = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// localhost:3001/api/products/17 -> DELETE
router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const categoryData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
