import React from "react";
import { Header } from "../Header/Header.jsx";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import Cart from "../Cart/Cart.jsx";
import { useCartContext } from "../../Context/CartContext.js";
import { BsCreditCard } from "react-icons/bs";
import { getTotalCartValue } from "../../Helper/helper.js";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { addToCart, setEmptyCart } = useCartContext();
  const { enqueueSnackbar } = useSnackbar();
  const { formData, setFormData } = useCartContext();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const performCheckout = (formData) => {
    if (!formData.username || !formData.address || !formData.phoneNumber) {
      enqueueSnackbar("Please enter your details", { variant: "error" });
      return;
    }
    setEmptyCart();
    enqueueSnackbar("Order placed successfully", { variant: "success" });

    navigate("/thanks");
    return true;
  };

  return (
    <div>
      <Header isSearchBar={false} />
      <Grid container className={styles.containerGrid}>
        <Grid item xs={12} md={9}>
          <Box className={styles.shippingContainer} minHeight="50vh">
            <Typography color="#3C3C3C" variant="h4" my="1rem">
              Shipping
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              Please enter your Name, address and mobile number to deliver your
              order.
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="username"
                name="username"
                placeholder="Name"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                id="address"
                name="address"
                placeholder="Address"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                variant="outlined"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Box>
            <Divider />

            <Box my="1rem">
              <Typography>Wallet</Typography>
              <Typography>
                Pay ₹{getTotalCartValue(addToCart)} cash when order is delivered
              </Typography>
            </Box>

            <Button
              startIcon={<BsCreditCard />}
              variant="contained"
              onClick={async () => {
                performCheckout(formData);
              }}
            >
              PLACE ORDER
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Cart addToCart={addToCart} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
