function SearchBar({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="query">Search Product</label>
      <input
        id="query"
        type="text"
        placeholder="Type product name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
