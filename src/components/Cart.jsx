// Importing necessary modules and components
import { Link } from 'react-router-dom'; // For navigation between pages without reload
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'; // Icons from lucide-react library
import { useCart } from '../context/CartContext'; // Custom hook to access Cart context

// Main Cart component
const Cart = () => {
  // Extracting state and functions from CartContext
  const {
    items,          // List of items in the cart
    removeItem,     // Function to remove an item from the cart
    incrementItem,  // Function to increase item quantity
    decrementItem,  // Function to decrease item quantity
    clearCart,      // Function to clear all items from cart
    getSubtotal,    // Function to calculate subtotal
    getTax,         // Function to calculate tax
    getTotal,       // Function to calculate total (subtotal + tax)
  } = useCart();

  // If cart is empty, show this message
  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <ShoppingBag size={64} className="text-muted mb-3" /> {/* Bag icon */}
          <h2>Your cart is empty</h2> {/* Message when no items */}
          <p className="text-muted mb-4">Add some products to get started!</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} className="me-2" /> {/* Back arrow */}
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If cart has items
  return (
    <div className="container py-5">
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold">Shopping Cart</h1>
        {/* Button to clear all items */}
        <button
          onClick={clearCart}
          className="btn btn-outline-danger"
          aria-label="Clear entire cart"
        >
          <Trash2 size={16} className="me-2" />
          Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Left side: List of cart items */}
        <div className="col-lg-8">
          {items.map(item => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="row g-3">
                  {/* Product image */}
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: '120px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Product details */}
                  <div className="col-md-9">
                    {/* Product title, price, and remove button */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="card-title mb-1">{item.title}</h5>
                        <p className="text-success fw-bold mb-2">${item.price.toFixed(2)} each</p>
                      </div>
                      {/* Remove single item */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-sm btn-outline-danger"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity controls and subtotal */}
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Quantity buttons */}
                      <div className="input-group" style={{ maxWidth: '150px' }}>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => decrementItem(item.id)} // Decrease quantity
                          disabled={item.quantity <= 1} // Disable if quantity = 1
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center"
                          value={item.quantity} // Display current quantity
                          readOnly
                          aria-label="Quantity"
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => incrementItem(item.id)} // Increase quantity
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Subtotal for this item */}
                      <div className="text-end">
                        <small className="text-muted d-block">Subtotal</small>
                        <h5 className="mb-0 text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: Order summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>

              {/* Subtotal */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-semibold">${getSubtotal().toFixed(2)}</span>
              </div>

              {/* Tax */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax (8%):</span>
                <span className="fw-semibold">${getTax().toFixed(2)}</span>
              </div>

              <hr />

              {/* Total */}
              <div className="d-flex justify-content-between mb-4">
                <span className="h5 mb-0">Total:</span>
                <span className="h5 mb-0 text-success">${getTotal().toFixed(2)}</span>
              </div>

              {/* Checkout and continue shopping buttons */}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg">
                  Proceed to Checkout
                </button>
                <Link to="/" className="btn btn-outline-secondary">
                  <ArrowLeft size={16} className="me-2" />
                  Continue Shopping
                </Link>
              </div>

              {/* Extra info */}
              <div className="mt-3 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>Free shipping</strong> on orders over $100
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the Cart component so it can be used in other parts of the app
export default Cart;
