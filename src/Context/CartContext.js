import React, { createContext, useContext, useState } from "react";
import { isItemInCart } from "../Helper/helper";
import { useSnackbar } from "notistack";
import {
  ALREADY_PRESENT_ITEM,
  NOT_AVAILABLE,
} from "../constant/constantString";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [addToCart, setAddToCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });

  const addToCartHandler = (
    productsData,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (options.preventDuplicate && isItemInCart(addToCart, productId)) {
      enqueueSnackbar(ALREADY_PRESENT_ITEM, {
        variant: "warning",
      });
      return;
    } else {
      let updatedData = [...productsData];
      updatedData.map((product) => {
        if (product.id === productId) {
          const item = { ...product, productQty: qty };
          setAddToCart((prevState) => [...prevState, item]);
        }
        return product;
      });
    }
  };

  const increaseItemCart = (item) => {
    let updatedData = [...addToCart];
    updatedData = updatedData.map((product) => {
      if (product.id === item.id) {
        if (product.productQty < product.quantity) {
          product.productQty = item.productQty + 1;
        } else {
          enqueueSnackbar(`${product.productQty} ` + NOT_AVAILABLE, {
            variant: "warning",
          });
        }
      }
      return product;
    });
    setAddToCart(updatedData);
  };

  const setEmptyCart = () => {
    setAddToCart([]);
  };

  const decreaseItemCart = (item) => {
    let updatedData = [...addToCart];
    updatedData = updatedData.map((product) => {
      if (product.id === item.id && product.productQty > 0) {
        product.productQty = item.productQty - 1;
      }
      return product;
    });
    if (item.productQty === 0) {
      updatedData = updatedData.filter((product) => product.id !== item.id);
    }
    setAddToCart(updatedData);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        addToCartHandler,
        increaseItemCart,
        decreaseItemCart,
        formData,
        setFormData,
        setEmptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
