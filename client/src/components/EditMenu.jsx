import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

const EditMenu = () => {
  // const initialCategories = [
  //   {
  //     name: "Snacks",
  //     items: [
  //       { name: "Fries", price: "$8" },
  //       { name: "Chips", price: "$5" },
  //     ],
  //   },
  //   {
  //     name: "Fast Food",
  //     items: [
  //       { name: "Burger", price: "$10" },
  //       { name: "Pizza", price: "$12" },
  //     ],
  //   },
  //   {
  //     name: "Wraps",
  //     items: [
  //       { name: "Veggie Wrap", price: "$6" },
  //       { name: "Chicken Wrap", price: "$8" },
  //     ],
  //   },
  // ];
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [CategoryError, setCategoryError] = useState(null);
  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState(false);

  // const toggleCategory = (index) => {
  //   setActiveCategory(index === activeCategory ? null : index);
  // };

  const showCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setCategoryError(null);
  };

  const submitCategory = async () => {
    const username = localStorage.getItem("admin");
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/addCategory",
        {
          categoryName,
          username: username ? username.replace(/['"]+/g, "") : "",
        }
      );
      if (response.data === "Category Created") {
        setCategoryError(null);
        setIsCategoryModalOpen(false);
        setCategoryName("");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setCategoryError(error.response.data.error);
      } else {
        setCategoryError("An error occurred while adding the Category.");
      }
    }
  };

  const cancelCategory = () => {
    setIsCategoryModalOpen(false);
    setCategoryName("");
    setCategoryError(null);
  };

  const fetchCategories = async () => {
    const username = localStorage.getItem("admin");
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/getCategories`,
        { params: { username: username ? username.replace(/['"]+/g, "") : "" } }
      );
      setCategories(response.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showEditCategoryModal = (categoryData) => {
    setIsCategoryEditModalOpen(true);
    setCategoryName(categoryData.categoryName);
  };

  const submitCategoryEdit = async (categoryId, newName) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/admin/editCategory`,
        { _id: categoryId, updatedData: { categoryName: newName } }
      );
      if (response.data.message === "Category Updated Successfully") {
        setCategoryName("");
        setIsCategoryEditModalOpen(false);
        setCategoryError(null);
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setCategoryError(error.response.data.error);
      } else {
        setCategoryError("An error occurred while updating the table.");
      }
    }
  };

  const cancelCategoryEdit = () => {
    setCategoryName("");
    setIsCategoryEditModalOpen(false);
    setCategoryError(null);
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/admin/deleteCategory`,
        { params: { _id: categoryId } }
      );
      if (response.data.message === "Category Deleted Successfully") {
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-container">
      <div className="menu-head">
        <h4 className="heading-menu">Menu</h4>
        <button
          type="button"
          className="button-add"
          onClick={showCategoryModal}
        >
          Add Category
        </button>
        <Modal
          title="Add Category"
          open={isCategoryModalOpen}
          onOk={submitCategory}
          onCancel={cancelCategory}
        >
          <div className="table-modal">
            <label htmlFor="tableName">Category:</label>
            <input
              type="text"
              id="tableName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            {CategoryError && (
              <div className="error-message">{CategoryError}</div>
            )}
          </div>
        </Modal>
      </div>
      <div className="category-list">
        <ul className="list">
          <div className="list-container">
            {categories.map((category, index) => (
              <li className="list-cat" key={index}>
                <div
                  // onClick={() => toggleCategory(index)}
                  className="category-container"
                >
                  <div>{category.categoryName}</div>
                  <div className="buttons">
                    <button
                      className="edit"
                      onClick={() => showEditCategoryModal(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                    <button className="add-menu">Add Menu</button>
                    <Modal
                      title="Edit Category"
                      open={isCategoryEditModalOpen}
                      onOk={() =>
                        submitCategoryEdit(category._id, categoryName)
                      }
                      onCancel={cancelCategoryEdit}
                    >
                      <div className="table-modal">
                        <label htmlFor="tableName">Category:</label>
                        <input
                          type="text"
                          id="editName"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                        {CategoryError && (
                          <div className="error-message">{CategoryError}</div>
                        )}
                      </div>
                    </Modal>
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
