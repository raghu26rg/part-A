import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Results from "./components/Results";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://part-a-backend.onrender.com"
    : "http://localhost:5000");

function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const buildSearchUrl = () => {
    const params = new URLSearchParams();

    if (query.trim()) params.append("q", query.trim());
    if (filters.category) params.append("category", filters.category);
    if (filters.minPrice !== "") params.append("minPrice", filters.minPrice);
    if (filters.maxPrice !== "") params.append("maxPrice", filters.maxPrice);

    return `${API_BASE_URL}/search?${params.toString()}`;
  };

  const fetchProducts = async () => {
    setError("");
    setHasSearched(true);

    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    if ((min !== null && Number.isNaN(min)) || (max !== null && Number.isNaN(max))) {
      setError("Min and Max price must be valid numbers.");
      return;
    }

    if (min !== null && max !== null && min > max) {
      setError("Invalid price range: Min price cannot be greater than Max price.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(buildSearchUrl());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products.");
      }

      setResults(data);
    } catch (apiError) {
      setError(apiError.message || "Something went wrong.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch with empty filters should return all products.
    fetchProducts();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProducts();
  };

  const handleReset = () => {
    setQuery("");
    setFilters({ category: "", minPrice: "", maxPrice: "" });
    setError("");
    setHasSearched(false);
    setResults([]);
    // Fetch all products after reset.
    setTimeout(() => fetchProducts(), 0);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div>
            <h1 className="title">Inventory Search</h1>
            <p className="subtitle">Search products by name, category, and price range.</p>
          </div>
          <div className="badge">In-memory demo</div>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Search</h2>
              <p className="card-hint">Leave fields empty to fetch all products.</p>
            </div>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <SearchBar value={query} onChange={setQuery} />
            <Filters
              category={filters.category}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onChange={handleFilterChange}
            />

            <div className="actions">
              <button type="submit" className="button primary" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
              <button type="button" className="button" onClick={handleReset} disabled={loading}>
                Reset
              </button>
            </div>
          </form>

          {error && (
            <div className="alert error" role="alert">
              <div className="alert-title">Something needs attention</div>
              <div className="alert-body">{error}</div>
            </div>
          )}
        </section>

        <section className="card">
          <div className="card-header results-header">
            <div>
              <h2 className="card-title">Results</h2>
              <p className="card-hint">
                {loading
                  ? "Loading…"
                  : `${results.length} product${results.length === 1 ? "" : "s"} found`}
              </p>
            </div>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="skeleton">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            ) : (
              <Results items={results} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
