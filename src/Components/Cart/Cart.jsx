import { Box, Button } from "@mui/material";
import React from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { getTotalCartValue } from "../../Helper/helper";

const Cart = ({ addToCart, isCheckOut = false }) => {
  const navigate = useNavigate();

  if (!addToCart.length) {
    return (
      <Box className={styles.emptyCart}>
        <AiOutlineShoppingCart style={{ width: "30px", height: "30px" }} />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  const routeToCheckoutPage = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.container}>
      <Box className={styles.cartContainer}>
        {addToCart?.map((item) => (
          <Box
            key={item.id}
            marginBottom="1rem"
            className={styles.CartBoxDesign}
          >
            <Box display="flex" alignItems="center" flexDirection="column">
              <Box className={styles.imageContainer}>
                <img
                  src={item.imageURL}
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                  alignItems="center"
                >
                  <ProductQuantity value={item} key={item.id} />
                  <Box padding="0.5rem" fontWeight="700">
                    ₹{item.price}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          padding="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
          className={styles.cartFooter}
        >
          <Box color="#3c3c3c" fontSize="16px">
            Order Total
          </Box>
          <Box color="#3c3c3c" fontWeight="700" fontSize="1.5rem">
            ₹{getTotalCartValue(addToCart)}
          </Box>
        </Box>
        {isCheckOut && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              className={styles.checkOutBtn}
              variant="contained"
              startIcon={<AiOutlineShoppingCart />}
              onClick={routeToCheckoutPage}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Cart;
