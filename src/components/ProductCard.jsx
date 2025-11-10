// Importing necessary modules and hooks
import { Link } from 'react-router-dom'; // For navigation without page reload
import { ShoppingCart, Eye } from 'lucide-react'; // Icons for cart and view
import { useCart } from '../context/CartContext'; // Access cart functions
import { useState } from 'react'; // Local state for temporary UI changes

// ProductCard component receives a product object as prop
const ProductCard = ({ product }) => {
  const { addItem } = useCart(); // Function to add product to cart
  const [isAdding, setIsAdding] = useState(false); // State to indicate temporary "added" status

  // Function triggered when user clicks "Add to Cart"
  const handleAddToCart = () => {
    addItem(product); // Add product to cart context
    setIsAdding(true); // Show temporary feedback ("Added!")
    setTimeout(() => setIsAdding(false), 500); // Reset feedback after 0.5s
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm hover-shadow transition">
        {/* Product image */}
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />

        {/* Card body */}
        <div className="card-body d-flex flex-column">
          {/* Product title */}
          <h5 className="card-title">{product.title}</h5>

          {/* Product description (limited to 80 chars) */}
          <p className="card-text text-muted small flex-grow-1">
            {product.description.substring(0, 80)}...
          </p>

          {/* Price and category */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="h5 mb-0 text-success">${product.price.toFixed(2)}</span>
            <span className="badge bg-secondary">{product.category}</span>
          </div>

          {/* Buttons: View and Add to Cart */}
          <div className="d-flex gap-2 mt-3">
            {/* Link to product details page */}
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-primary flex-grow-1"
              aria-label={`View details for ${product.title}`} // Accessibility
            >
              <Eye size={16} className="me-1" />
              View
            </Link>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className={`btn ${isAdding ? 'btn-success' : 'btn-primary'} flex-grow-1`}
              aria-label={`Add ${product.title} to cart`} // Accessibility
            >
              <ShoppingCart size={16} className="me-1" />
              {isAdding ? 'Added!' : 'Add'} {/* Temporary feedback */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default ProductCard;
