import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from "./Thanks.module.css";
import { useCartContext } from "../../Context/CartContext";

const Thanks = () => {
  const navigate = useNavigate();
  const { formData } = useCartContext();
  console.log("formData", formData);
  const routeToProducts = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <Box className={styles.greetingContainer}>
        <h2>Yay {formData.username} ! It's ordered 😃</h2>
        <p>You will receive an invoice for your order shortly.</p>
        <p>
          Your order will arrive in 7 business days on "{formData.address}"
          address.
        </p>
        <Button
          variant="contained"
          size="large"
          id="continue-btn"
          onClick={routeToProducts}
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
};

export default Thanks;
