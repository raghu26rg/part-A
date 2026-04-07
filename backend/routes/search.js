const express = require("express");
const products = require("../data");

const router = express.Router();

router.get("/", (req, res) => {
  const { q = "", category = "", minPrice, maxPrice } = req.query;

  const parsedMin = minPrice !== undefined && minPrice !== "" ? Number(minPrice) : null;
  const parsedMax = maxPrice !== undefined && maxPrice !== "" ? Number(maxPrice) : null;

  if ((parsedMin !== null && Number.isNaN(parsedMin)) || (parsedMax !== null && Number.isNaN(parsedMax))) {
    return res.status(400).json({ error: "minPrice and maxPrice must be valid numbers." });
  }

  if (parsedMin !== null && parsedMax !== null && parsedMin > parsedMax) {
    return res.status(400).json({ error: "Invalid price range: minPrice cannot be greater than maxPrice." });
  }

  const normalizedQuery = q.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const nameMatches =
      normalizedQuery.length === 0 || product.name.toLowerCase().includes(normalizedQuery);
    const categoryMatches =
      normalizedCategory.length === 0 || product.category.toLowerCase() === normalizedCategory;
    const minMatches = parsedMin === null || product.price >= parsedMin;
    const maxMatches = parsedMax === null || product.price <= parsedMax;

    return nameMatches && categoryMatches && minMatches && maxMatches;
  });

  return res.json(filteredProducts);
});

module.exports = router;
