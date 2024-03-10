import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FoodMenu = () => {
  const [restaurantName, setRestaurantName] = useState();
  const [tableName, setTableName] = useState();

  const routeParams = useParams();

  const setRestaurantTable = async () => {
    setTableName(routeParams?.tableName);
    let admin = routeParams?.adminId;
    try {
      const response = await axios.get(
        `http://localhost:4000/user/getRestaurantName`,
        { params: { admin } }
      );
      setRestaurantName(response.data.restaurant.restaurantName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRestaurantTable();
  }, []);
  return (
    <>
      <div className="food-header">
        <div className="header-container w-100 d-flex justify-content-between">
          <div className="rest-details d-flex flex-column">
            <span className="rest-name">{restaurantName}</span>
            <span className="table-name">{tableName}</span>
          </div>
          <div className="cart-button">
            <img
              src="/images/cart-icon.svg"
              alt="cart"
              height={25}
              width={25}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
