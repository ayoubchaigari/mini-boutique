// Import React hooks, icons, and components
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react'; // Icons for search and category
import ProductList from '../components/ProductList'; // Component to display product cards
import productsData from '../data/products.json'; // Sample products data

const Home = () => {
  // State for all products (from JSON)
  const [products] = useState(productsData);
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('all');
  // State for sorting option
  const [sortBy, setSortBy] = useState('default');

  // Create a list of categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter and sort products based on search term, category, and sort option
  const filteredProducts = products
    .filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price; // Low to high price
      if (sortBy === 'price-desc') return b.price - a.price; // High to low price
      if (sortBy === 'name') return a.title.localeCompare(b.title); // Alphabetical
      return 0; // Default, no sorting
    });

  return (
    <div className="container py-5">
      {/* Page header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Welcome to Mini Boutique</h1>
        <p className="lead text-muted">Discover our curated collection of tech accessories</p>
      </div>

      {/* Filters card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            {/* Search input */}
            <div className="col-md-5">
              <label htmlFor="search" className="form-label small text-muted">
                <Search size={14} className="me-1" />
                Search Products
              </label>
              <input
                id="search"
                type="text"
                className="form-control"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <div className="col-md-4">
              <label htmlFor="category" className="form-label small text-muted">
                <SlidersHorizontal size={14} className="me-1" />
                Category
              </label>
              <select
                id="category"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort option */}
            <div className="col-md-3">
              <label htmlFor="sort" className="form-label small text-muted">
                Sort By
              </label>
              <select
                id="sort"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filter summary and clear button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
        </p>
        {(searchTerm || selectedCategory !== 'all') && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              setSearchTerm(''); // Reset search
              setSelectedCategory('all'); // Reset category
              setSortBy('default'); // Reset sorting
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Product list or "no products" message */}
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
