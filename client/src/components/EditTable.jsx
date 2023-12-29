import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const EditTable = () => {
  const [tables, setTables] = useState([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [TableError, setTableError] = useState(null);

  const showTableModal = () => {
    setIsTableModalOpen(true);
  };

  const submitTable = async () => {
    const username = localStorage.getItem("admin");
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/addTable",
        { tableName, username: username ? username.replace(/['"]+/g, "") : "" }
      );
      if (response.data === "Table Added") {
        setTableName("");
        setIsTableModalOpen(false);
        setTableError(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setTableError(error.response.data.error);
      } else {
        setTableError("An error occurred while adding the table.");
      }
    }
  };

  const cancelTable = () => {
    setTableName("");
    setIsTableModalOpen(false);
    setTableError(null);
  };

  // const fetchTables = async () => {
  //   const username = localStorage.getItem("admin");
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/admin/getTables`,
  //       { params: { username: username } }
  //     );
  //     setTables(response.data.tables || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTables();
  // }, []);
  return (
    <div className="edit-container">
      <div className="table-head">
        <h4 className="heading-table">Tables</h4>
        <button type="button" className="button-add" onClick={showTableModal}>
          Add Table
        </button>
        <Modal
          title="Add Table"
          open={isTableModalOpen}
          onOk={submitTable}
          onCancel={cancelTable}
        >
          <div className="table-modal">
            <label htmlFor="tableName">Table Name:</label>
            <input
              type="text"
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            {TableError && <div className="error-message">{TableError}</div>}
          </div>
        </Modal>
      </div>
      <div className="table-list">
        <ul className="list">
          <div className="list-container">
            {tables.map((table, index) => (
              <li className="list-table" key={index}>
                <div className="table-container">
                  <div>{table.name}</div>
                  <div className="buttons">
                    <button className="generate">Generate QR</button>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default EditTable;
