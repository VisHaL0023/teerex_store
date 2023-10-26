import { fetchProducts } from "../../API/api";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Header } from "../Header/Header";
import styles from "./LandingPage.module.css";
import CheckBoxFilter from "../CheckBoxFilter/CheckBoxFilter";
import ListingPage from "../ListingPage/ListingPage";
import { useCartContext } from "../../Context/CartContext";
import Cart from "../Cart/Cart";

const LandingPage = () => {
  const { addToCart } = useCartContext();
  const { snackBar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [colourFilterData, setColourFilterData] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [productTypeFilter, setProductTypeFilter] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  const fetchProductsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts();
      setProductsData(response);
    } catch (error) {
      console.log(error);
      snackBar("Error occurred while getting data", { variant: "error" });
    }
    setIsLoading(false);
  };

  //Handle Filter Data

  const handleColourFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If checked then add to colout filter
      setColourFilterData((prevState) => [...prevState, event.target.value]);
    } else {
      // If not checked then remove
      setColourFilterData((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handleGenderFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If checked then add to colout filter
      setGenderFilter((prevState) => [...prevState, event.target.value]);
    } else {
      // If not checked then remove
      setGenderFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handlePriceFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If checked then add to colout filter
      setPriceFilterData((prevState) => [...prevState, event.target.value]);
    } else {
      // If not checked then remove
      setPriceFilterData((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handleProductTypeFilter = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If checked then add to colout filter
      setProductTypeFilter((prevState) => [...prevState, event.target.value]);
    } else {
      // If not checked then remove
      setProductTypeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className={styles.container}>
      <Header setSearchValue={setSearchValue} />

      <div className={styles.productListingContainer}>
        <div className={styles.checkBoxContainer}>
          <CheckBoxFilter
            colourFilterData={colourFilterData}
            genderFilter={genderFilter}
            priceFilterData={priceFilterData}
            productTypeFilter={productTypeFilter}
            handleColourFilterChange={handleColourFilterChange}
            handleGenderFilterChange={handleGenderFilterChange}
            handlePriceFilterChange={handlePriceFilterChange}
            handleProductTypeFilter={handleProductTypeFilter}
          />
        </div>

        <div className={styles.listingPageContainer}>
          <ListingPage
            productsData={productsData}
            isLoading={isLoading}
            colourFilterData={colourFilterData}
            genderFilter={genderFilter}
            priceFilterData={priceFilterData}
            productTypeFilter={productTypeFilter}
            searchValue={searchValue}
          />
        </div>

        <Cart addToCart={addToCart} isCheckOut={true} />
      </div>
    </div>
  );
};

export default LandingPage;
