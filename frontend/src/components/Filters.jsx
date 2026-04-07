const CATEGORIES = ["", "Electronics", "Clothing", "Furniture", "Books"];

function Filters({ category, minPrice, maxPrice, onChange }) {
  return (
    <div className="filters">
      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(event) => onChange("category", event.target.value)}
        >
          {CATEGORIES.map((option) => (
            <option key={option || "all"} value={option}>
              {option || "All Categories"}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="minPrice">Min Price</label>
        <input
          id="minPrice"
          type="number"
          min="0"
          placeholder="0"
          value={minPrice}
          onChange={(event) => onChange("minPrice", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          placeholder="1000"
          value={maxPrice}
          onChange={(event) => onChange("maxPrice", event.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
