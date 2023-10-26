import React from "react";
import styles from "../LandingPage/LandingPage.module.css";

const colours = ["Red", "Blue", "Green"];
const gender = ["Men", "Women"];
const price = ["0-250", "250-450", "450-100000"];
const typeCheckBox = ["Polo", "Hoddie", "Basic"];

const CheckBoxFilter = ({
  colourFilterData,
  genderFilter,
  priceFilterData,
  productTypeFilter,
  handleColourFilterChange,
  handleGenderFilterChange,
  handlePriceFilterChange,
  handleProductTypeFilter,
}) => {
  return (
    <div className={styles.checkboxFilterContainer}>
      {/* Colour filter */}
      <div className={styles.colourFilter}>
        <h4>Colour</h4>
        {colours.map((colour, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={colour}
                checked={colourFilterData.includes(colour)}
                onChange={handleColourFilterChange}
              />
              {colour}
            </label>
          </div>
        ))}
      </div>

      {/* Gender filter */}
      <div className={styles.genderFilter}>
        <h4>Gender</h4>
        {gender.map((gen, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={gen}
                checked={genderFilter.includes(gen)}
                onChange={handleGenderFilterChange}
              />
              {gen}
            </label>
          </div>
        ))}
      </div>

      {/* Price filter */}
      <div className={styles.priceFilter}>
        <h4>Price</h4>
        {price.map((priceValue, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={priceValue}
                checked={priceFilterData.includes(priceValue)}
                onChange={handlePriceFilterChange}
              />
              {priceValue}
            </label>
          </div>
        ))}
      </div>

      {/* Colour filter */}
      <div className={styles.typeFilter}>
        <h4>Type</h4>
        {typeCheckBox.map((productType, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={productType}
                checked={productTypeFilter.includes(productType)}
                onChange={handleProductTypeFilter}
              />
              {productType}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxFilter;
