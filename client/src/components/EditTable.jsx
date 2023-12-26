import React, { useState } from "react";

const EditTable = () => {
  const initalTables = [
    {
      name: "Table 1",
    },
    {
      name: "Table 2",
    },
    {
      name: "Table 3",
    },
  ];

  const [tables, setTables] = useState(initalTables);
  return (
    <div className="edit-container">
      <div className="table-head">
        <h4 className="heading-table">Tables</h4>
        <button type="button" className="button-add">
          Add Table
        </button>
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
