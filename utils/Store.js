import { createContext, useReducer } from "react";
import {
  useLocalStorage,
  writeStorage,
  deleteFromStorage,
} from "@rehooks/local-storage";
export const contextStore = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      const loginUser = action.payload;
      writeStorage("userInfo", loginUser);
      return { ...state, userInfo: loginUser };
    }
    case "USER_LOGOUT": {
      deleteFromStorage("userInfo");
      return { ...state, userInfo: null };
    }
    case "CLEAR_CART": {
      deleteFromStorage("cartInfo");
      return { ...state, cart: { ...state.cart, cartItems: null } };
    }
    case "ADD_TO_CART": {
      let allredyIncart = false;
      const newItem = action.payload;
      const exitItems = state.cart.cartItems.slice();
      exitItems.forEach((element) => {
        if (element.name === newItem.name) {
          allredyIncart = true;
        }
      });
      if (!allredyIncart) {
        exitItems.push(newItem);
      }
      writeStorage("cartInfo", exitItems);
      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    case "REMOVE_ITEM": {
      if (confirm("It's going to delete this item from your cart.") == true) {
        const removeItem = action.payload;
        const exitItems = state.cart.cartItems.slice();

        const index = exitItems.indexOf(removeItem);
        if (index > -1) {
          exitItems.splice(index, 1);
        }
        deleteFromStorage("cartInfo");
        writeStorage("cartInfo", exitItems);
        return { ...state, cart: { ...state.cart, cartItems: exitItems } };
      }
      return state;
    }

    case "CART_PLUS": {
      let newItem = action.payload;
      let exitItems = state.cart.cartItems.slice();
      exitItems.forEach((element) => {
        if (element.product === newItem.product) {
          element.qty++;
        }
      });

      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    case "CART_MINUS": {
      const newItem = action.payload;
      const exitItems = state.cart.cartItems.slice();
      exitItems.forEach((element) => {
        if (element.product === newItem.product) {
          if (element.qty === 1) {
            alert("Sorry, you have reached in minimum quantity!");
            return state;
          }
          element.qty--;
        }
      });

      return { ...state, cart: { ...state.cart, cartItems: exitItems } };
    }
    default:
      return state;
  }
};
export default function StoreProvider(props) {
  const [userInfo] = useLocalStorage("userInfo");
  const [cartInfo] = useLocalStorage("cartInfo");

  const initialState = {
    userInfo: userInfo ? userInfo : null,
    cart: {
      cartItems: cartInfo ? cartInfo : [],
      orderInfo: {},
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <contextStore.Provider value={value}>
      {props.children}
    </contextStore.Provider>
  );
}
