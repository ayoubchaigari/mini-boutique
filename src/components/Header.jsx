// Import necessary modules
import { Link } from 'react-router-dom'; // For navigation without page reload
import { ShoppingCart } from 'lucide-react'; // Cart icon
import { useCart } from '../context/CartContext'; // Custom hook to access cart data

// Header component
function Header() {
  // Extract getCartCount function from CartContext
  const { getCartCount } = useCart();
  const cartCount = getCartCount(); // Number of items in the cart

  return (
    // Navbar container
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Mini Boutique
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Cart link with badge showing number of items */}
            <li className="nav-item">
              <Link
                className="nav-link position-relative"
                to="/cart"
                aria-label={`Cart with ${cartCount} items`} // Accessibility: announces number of items
              >
                <ShoppingCart size={20} /> {/* Cart icon */}
                {/* Show badge only if there are items in the cart */}
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount} {/* Number of items */}
                    <span className="visually-hidden">items in cart</span> {/* For screen readers */}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Export Header component
export default Header;
