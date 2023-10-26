import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./ProductsCard.module.css";
import { useCartContext } from "../../Context/CartContext";

const ProductsCard = ({ products, productsData }) => {
  const { addToCartHandler } = useCartContext();

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={products.imageURL}
        alt={products.name}
        className={styles.imgContainer}
      />
      <CardContent>
        <Typography>{products.name}</Typography>
        <Typography>₹{products.price}</Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          className={styles.cardButton}
          fullWidth
          variant="contained"
          startIcon={<AiOutlineShoppingCart />}
          onClick={() =>
            addToCartHandler(productsData, products.id, 1, {
              preventDuplicate: true,
            })
          }
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductsCard;
