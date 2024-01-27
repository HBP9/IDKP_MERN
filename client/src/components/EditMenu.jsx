import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

const EditMenu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [CategoryError, setCategoryError] = useState(null);
  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [ItemError, setItemError] = useState(null);
  const [items, setItems] = useState([]);
  const [isItemEditModal, setIsItemEditModal] = useState(false);

  const toggleCategory = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
    if (index !== activeCategory) {
      setItems([]);
    }
  };

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

  useEffect(() => {
    if (activeCategory !== null) {
      fetchItems(categories[activeCategory]._id);
    }
  }, [activeCategory]);

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
        const itemResponse = await axios.delete(
          `http://localhost:4000/admin/deleteItemsByCategory`,
          { params: { categoryId } }
        );
        fetchCategories();
        if (itemResponse.data.message === "Item Deleted Successfully") {
          console.log("Completed Process");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = () => {
    setIsAddItemModalOpen(true);
    setItemError(null);
  };

  const submitItem = async (categoryId) => {
    const username = localStorage.getItem("admin");
    try {
      const response = await axios.post("http://localhost:4000/admin/addMenu", {
        itemName,
        price,
        categoryId,
        username: username ? username.replace(/['"]+/g, "") : "",
      });
      if (response.data === "Item Added") {
        setIsAddItemModalOpen(false);
        setItemName("");
        setPrice(0);
        setItemError(null);
        fetchItems(categories[activeCategory]._id);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setItemError(error.response.data.error);
      } else {
        setItemError("An error occurred while adding the Item.");
      }
    }
  };

  const cancelItem = () => {
    setIsAddItemModalOpen(false);
    setItemName("");
    setPrice(0);
    setItemError(null);
  };

  const fetchItems = async (categoryId) => {
    const username = localStorage.getItem("admin");
    try {
      const response = await axios.get(`http://localhost:4000/admin/getItems`, {
        params: {
          username: username ? username.replace(/['"]+/g, "") : "",
          categoryId,
        },
      });
      setItems(response.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const showItemEditModal = (itemData) => {
    setIsItemEditModal(true);
    setItemName(itemData.itemName);
    setPrice(itemData.price);
  };

  const cancelItemEdit = () => {
    setItemName("");
    setPrice(0);
    setIsItemEditModal(false);
    setItemError(null);
  };

  const submitItemEdit = async (itemId, newName, newPrice) => {
    try {
      const response = await axios.put(`http://localhost:4000/admin/editItem`, {
        _id: itemId,
        updatedData: { itemName: newName, price: newPrice },
      });
      if (response.data.message === "Item Updated Successfully") {
        setItemName("");
        setPrice(0);
        setIsItemEditModal(false);
        setItemError(null);
        fetchItems(categories[activeCategory]._id);
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

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/admin/deleteItem`,
        { params: { _id: itemId } }
      );
      if (response.data.message === "Item Deleted Successfully") {
        fetchItems(categories[activeCategory]._id);
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
                  onClick={() => toggleCategory(index)}
                  className="category-container"
                >
                  <div>{category.categoryName}</div>
                  <div className="buttons" onClick={(e) => e.stopPropagation()}>
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
                    <button className="add-menu" onClick={() => addItem()}>
                      Add Menu
                    </button>
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
                    <Modal
                      title="Add Item"
                      open={isAddItemModalOpen}
                      onOk={() => submitItem(category._id)}
                      onCancel={cancelItem}
                    >
                      <div className="table-modal">
                        <label htmlFor="itemName">Item Name:</label>
                        <input
                          type="text"
                          id="editName"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        <label htmlFor="price">Price:</label>
                        <input
                          type="number"
                          id="editName"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        {ItemError && (
                          <div className="error-message">{ItemError}</div>
                        )}
                      </div>
                    </Modal>
                  </div>
                </div>
                {activeCategory === index && (
                  <ul>
                    {items.length > 0 ? (
                      items.map((item, itemIndex) => (
                        <li className="item-details" key={itemIndex}>
                          {item.itemName} - ₹&nbsp;{item.price}
                          <div className="buttons">
                            <button
                              className="edit"
                              onClick={() => showItemEditModal(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete"
                              onClick={() => deleteItem(item._id)}
                            >
                              Delete
                            </button>
                            <Modal
                              title="Edit Menu"
                              open={isItemEditModal}
                              onOk={() =>
                                submitItemEdit(item._id, itemName, price)
                              }
                              onCancel={cancelItemEdit}
                            >
                              <div className="table-modal">
                                <label htmlFor="itemName">Item Name:</label>
                                <input
                                  type="text"
                                  id="editName"
                                  value={itemName}
                                  onChange={(e) => setItemName(e.target.value)}
                                />
                                <label htmlFor="price">Price:</label>
                                <input
                                  type="number"
                                  id="editName"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                                {ItemError && (
                                  <div className="error-message">
                                    {ItemError}
                                  </div>
                                )}
                              </div>
                            </Modal>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="item-details">No items added yet</li>
                    )}
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
