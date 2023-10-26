import { IconButton, Stack } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { Box } from "@mui/material";
import React from "react";
import { useCartContext } from "../../Context/CartContext";

const ProductQuantity = ({ value }) => {
  const { increaseItemCart, decreaseItemCart } = useCartContext();

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        size="small"
        color="primary"
        onClick={() => decreaseItemCart(value)}
      >
        <IoIosRemoveCircleOutline />
      </IconButton>
      <Box padding="0.5rem"> {value.productQty}</Box>
      <IconButton
        size="small"
        color="primary"
        onClick={() => increaseItemCart(value)}
      >
        <AiOutlinePlusCircle />
      </IconButton>
    </Stack>
  );
};

export default ProductQuantity;
