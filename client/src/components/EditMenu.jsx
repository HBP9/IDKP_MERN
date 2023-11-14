import React, { useState } from "react";

const EditMenu = () => {
  const initialCategories = [
    {
      name: "Snacks",
      items: [
        { name: "Fries", price: "$8" },
        { name: "Chips", price: "$5" },
      ],
    },
    {
      name: "Fast Food",
      items: [
        { name: "Burger", price: "$10" },
        { name: "Pizza", price: "$12" },
      ],
    },
    {
      name: "Wraps",
      items: [
        { name: "Veggie Wrap", price: "$6" },
        { name: "Chicken Wrap", price: "$8" },
      ],
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className="edit-container">
      <div className="menu-head">
        <h4 className="heading-menu">Menu</h4>
        <button type="button" className="button-add">
          Add Category
        </button>
      </div>
      <div className="category-list">
        <ul className="list">
          <div className="list-container">
            {categories.map((category, index) => (
              <li className="list-cat" key={index}>
                <div
                  onClick={() => toggleCategory(index)}
                  className="category-container"
                >
                  <div>{category.name}</div>
                  <div className="buttons">
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                    <button className="add-menu">Add Menu</button>
                  </div>
                </div>
                {activeCategory === index && (
                  <ul>
                    {category.items.map((item, itemIndex) => (
                      <li className="item-details" key={itemIndex}>
                        {item.name} - {item.price}
                        <div className="buttons">
                          <button className="edit">Edit</button>
                          <button className="delete">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default EditMenu;
