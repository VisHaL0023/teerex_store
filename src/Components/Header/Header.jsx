import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ setSearchValue, isSearchBar = true }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const eventValue = e.target.value;
    setSearchValue(eventValue);
  };

  const routeToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={styles.headerConatiner}>
      <div className={styles.headerData}>
        <p className={styles.teerax} onClick={routeToHomePage}>
          TeeRex Store
        </p>
        {isSearchBar && (
          <input
            className={styles.search}
            placeholder="Search by Name"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
