import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Note that data._id was stored as product
      const currentItemToBeAdded = action.payload;
      const existingItemInCart = state.cartItems.find(
        (item) => item.product === currentItemToBeAdded.product
      );
      // if item exist in cart, then we replace existingItemInCart with currentItemToBeAdded
      if (existingItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItemInCart.product
              ? currentItemToBeAdded
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currentItemToBeAdded],
        };
      }
    default:
      return state;
  }
};
