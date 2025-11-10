// Reducer function to handle cart state updates
export const cartReducer = (state, action) => {
  switch (action.type) {

    // Add a new item or update quantity if it already exists
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // If item exists, increase its quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } // Add provided quantity or 1
              : item
          ),
        };
      }

      // If item is new, add it to the cart
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 } // Default quantity = 1
        ],
      };
    }

    // Remove an item from the cart by its ID
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    // Increment the quantity of an item by 1
    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    // Decrement the quantity of an item by 1 (minimum 1)
    case 'DECREMENT': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    // Clear all items from the cart
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    // Load cart from localStorage or saved state
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    // Default: return current state if action type is unknown
    default:
      return state;
  }
};
