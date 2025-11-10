// Import necessary modules and hooks
import { useState } from 'react'; // Local state for quantity and "adding" feedback
import { Link } from 'react-router-dom'; // Navigation without reload
import { ShoppingCart, ArrowLeft } from 'lucide-react'; // Icons for cart and back arrow
import { useCart } from '../context/CartContext'; // Access cart context functions

// ProductDetail component receives a product object as a prop
const ProductDetail = ({ product }) => {
  const { addItem } = useCart(); // Function to add product(s) to cart
  const [quantity, setQuantity] = useState(1); // Current quantity selected
  const [isAdding, setIsAdding] = useState(false); // Feedback state for "Added to cart"

  // Handle manual input change in quantity field
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value); // Only allow positive numbers
    }
  };

  // Increment quantity by 1
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrement quantity by 1 (minimum 1)
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    addItem(product, quantity); // Add product with selected quantity
    setIsAdding(true); // Show "Added" feedback
    setTimeout(() => {
      setIsAdding(false); // Reset feedback after 1s
      setQuantity(1); // Reset quantity to 1
    }, 1000);
  };

  return (
    <div className="container py-5">
      {/* Back button */}
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <ArrowLeft size={16} className="me-2" />
        Back to Products
      </Link>

      <div className="row g-4">
        {/* Product image */}
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        {/* Product details */}
        <div className="col-md-6">
          {/* Title and category */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="display-5 fw-bold">{product.title}</h1>
            <span className="badge bg-secondary fs-6">{product.category}</span>
          </div>

          {/* Price */}
          <h2 className="text-success mb-4">${product.price.toFixed(2)}</h2>

          {/* Full description */}
          <p className="lead mb-4">{product.description}</p>

          {/* Quantity selection card */}
          <div className="card bg-light border-0 p-4 mb-4">
            <h5 className="mb-3">Quantity</h5>
            <div className="input-group" style={{ maxWidth: '200px' }}>
              {/* Decrement button */}
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                -
              </button>
              {/* Input field */}
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                aria-label="Quantity"
              />
              {/* Increment button */}
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <div className="d-grid gap-2">
            <button
              onClick={handleAddToCart}
              className={`btn btn-lg ${isAdding ? 'btn-success' : 'btn-primary'}`}
              aria-label={`Add ${quantity} ${product.title} to cart`}
            >
              <ShoppingCart size={20} className="me-2" />
              {isAdding
                ? 'Added to Cart!'
                : `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`}
            </button>
          </div>

          {/* Extra product details */}
          <div className="mt-4 p-3 border rounded">
            <h6 className="fw-bold mb-2">Product Details</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                <small className="text-muted">Category:</small> <strong>{product.category}</strong>
              </li>
              <li className="mb-1">
                <small className="text-muted">Price per unit:</small> <strong>${product.price.toFixed(2)}</strong>
              </li>
              <li>
                <small className="text-muted">Product ID:</small> <strong>#{product.id}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component
export default ProductDetail;
