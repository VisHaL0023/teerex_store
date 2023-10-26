import React, { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import styles from "./ListingPage.module.css";
import ProductsCard from "../ProductsCard/ProductsCard";
import { useCartContext } from "../../Context/CartContext";
import { handleBasedOnSearch } from "../../Helper/helper";

const ListingPage = ({
  productsData,
  isLoading,
  colourFilterData,
  genderFilter,
  priceFilterData,
  productTypeFilter,
  searchValue,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const { addToCart } = useCartContext();

  const displayData = useMemo(() => {
    return applyAllFilter(
      productsData,
      colourFilterData,
      genderFilter,
      priceFilterData,
      productTypeFilter,
      searchValue
    );
  }, [
    productsData,
    colourFilterData,
    genderFilter,
    priceFilterData,
    productTypeFilter,
    searchValue,
  ]);

  function applyAllFilter(
    filteredData,
    colourFilterData,
    genderFilter,
    priceFilterData,
    productTypeFilter,
    searchValue
  ) {
    let updatedData = [...filteredData];

    if (colourFilterData.length) {
      updatedData = updatedData.filter((product) =>
        colourFilterData.includes(product.color)
      );
    }

    if (genderFilter.length) {
      updatedData = updatedData.filter((product) =>
        genderFilter.includes(product.gender)
      );
    }

    if (productTypeFilter.length) {
      updatedData = updatedData.filter((product) =>
        productTypeFilter.includes(product.type)
      );
    }

    if (priceFilterData.length) {
      updatedData = updatedData.filter((product) => {
        let found = false;
        priceFilterData.forEach((rangeValue) => {
          let low = rangeValue.split("-")[0];
          let high = rangeValue.split("-")[1];
          if (
            Number(product.price) >= Number(low) &&
            Number(product.price) <= Number(high)
          ) {
            found = true;
          }
        });
        return found;
      });
    }

    if (searchValue) {
      updatedData = handleBasedOnSearch(searchValue, updatedData);
    }

    return updatedData;
  }

  // console.log("addCart", addToCart);
  useEffect(() => {
    setFilteredData(productsData);
  }, [productsData]);

  return (
    <div className={styles.gridContainer}>
      <Grid item xs={12} md={9} sm={6} className={styles.productGrid}>
        {isLoading ? (
          <Stack display="flex" justifyContent="center">
            <CircularProgress />
            <p>Loading Products</p>
          </Stack>
        ) : (
          <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
            {displayData.length ? (
              displayData.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductsCard
                    products={product}
                    productsData={productsData}
                    addToCart={addToCart}
                  />
                </Grid>
              ))
            ) : (
              <Box className={styles.loading}>
                <h4>No products found</h4>
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ListingPage;
