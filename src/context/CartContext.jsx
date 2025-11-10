// Import React hooks and the reducer
import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer } from './cartReducer'; // Reducer function to manage cart state

// Create the CartContext
const CartContext = createContext();

// Key used for storing cart data in localStorage
const CART_STORAGE_KEY = 'mini-boutique-cart';
// Tax rate constant
const TAX_RATE = 0.08;

// Initial state for the cart
const initialState = {
  items: [], // Array to hold cart items
};

// CartProvider component wraps your app and provides cart state/functions
export const CartProvider = ({ children }) => {
  // useReducer manages cart state with cartReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Add an item to the cart
  const addItem = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      },
    });
  };

  // Remove an item by ID
  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  // Increase quantity of an item
  const incrementItem = (productId) => {
    dispatch({ type: 'INCREMENT', payload: productId });
  };

  // Decrease quantity of an item (minimum handled in reducer)
  const decrementItem = (productId) => {
    dispatch({ type: 'DECREMENT', payload: productId });
  };

  // Clear all items from cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Get total number of items in the cart
  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate subtotal (sum of price * quantity)
  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate tax based on subtotal
  const getTax = () => {
    return getSubtotal() * TAX_RATE;
  };

  // Calculate total including tax
  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  // Context value to provide to children
  const value = {
    items: state.items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    getCartCount,
    getSubtotal,
    getTax,
    getTotal,
  };

  // Provide cart context to children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for consuming the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
