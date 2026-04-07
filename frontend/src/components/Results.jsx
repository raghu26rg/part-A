function Results({ items }) {
  const categoryClassMap = {
    Electronics: "pill-electronics",
    Clothing: "pill-clothing",
    Furniture: "pill-furniture",
    Books: "pill-books",
  };

  if (items.length === 0) {
    return <p className="empty">No results found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="product-name">{item.name}</td>
              <td>
                <span className={`category-pill ${categoryClassMap[item.category] || ""}`}>
                  {item.category}
                </span>
              </td>
              <td>
                <span className="price-tag">${item.price.toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
