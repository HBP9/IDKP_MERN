import React from "react";

const Orders = () => {
  const orders = [
    {
      tableNo: 1,
      items: [
        { name: "Burger", quantity: 2 },
        { name: "Fries", quantity: 1 },
        { name: "Soda", quantity: 3 },
      ],
      status: "completed",
      time: "2023-12-05T12:30:00",
    },
    {
      tableNo: 2,
      items: [
        { name: "Pizza", quantity: 1 },
        { name: "Salad", quantity: 2 },
        { name: "Water", quantity: 1 },
      ],
      status: "pending",
      time: "2023-12-05T13:15:00",
    },
    {
      tableNo: 3,
      items: [
        { name: "Pasta", quantity: 2 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Cola", quantity: 2 },
      ],
      status: "cancelled",
      time: "2023-12-05T14:00:00",
    },
    {
      tableNo: 4,
      items: [
        { name: "Steak", quantity: 1 },
        { name: "Mashed Potatoes", quantity: 1 },
        { name: "Wine", quantity: 1 },
      ],
      status: "completed",
      time: "2023-12-05T15:45:00",
    },
    {
      tableNo: 5,
      items: [
        { name: "Sushi", quantity: 3 },
        { name: "Edamame", quantity: 1 },
        { name: "Green Tea", quantity: 2 },
      ],
      status: "pending",
      time: "2023-12-05T17:30:00",
    },
  ];
  return (
    <>
      <div className="orders-container">
        <div className="table-head">
          <h4 className="heading-table">Orders</h4>
        </div>
        <div className="table-list">
          <ul className="list">
            <div className="list-container">
              {orders.map((order, index) => (
                <li className="list-table" key={index}>
                  <div className="item-table-container">
                    <div className="item-t-head">
                      <span>Table No : {order.tableNo}</span>
                      <span>
                        {new Date(order.time).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="order-detail">
                      <div className="items">
                        {order.items.map((items, index) => (
                          <div className="item-list" key={index}>
                            <span className="item-name">{items.name}</span>
                            <span className="item-qty">
                              {" "}
                              x {items.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="status">
                        <span className="status-text">{order.status}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Orders;
