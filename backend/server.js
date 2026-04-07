const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Inventory Search API is running." });
});

app.use("/search", searchRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
