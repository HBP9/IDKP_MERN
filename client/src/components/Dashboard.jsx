import React, { useState } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState([
    { tableNumber: 1, orderName: "Order 1", status: "pending" },
    { tableNumber: 2, orderName: "Order 2", status: "pending" },
    { tableNumber: 3, orderName: "Order 3", status: "pending" },
    { tableNumber: 4, orderName: "Order 4", status: "pending" },
    { tableNumber: 5, orderName: "Order 5", status: "pending" },
    { tableNumber: 6, orderName: "Order 6", status: "pending" },
  ]);

  const completeOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = "completed";
    setOrders(updatedOrders);
  };

  const cancelOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = "canceled";
    setOrders(updatedOrders);
  };
  return (
    <div className="container order-container">
      {orders.length === 0 ? (
        <div className="text-center">
          <h1>No orders yet</h1>
        </div>
      ) : (
        <div className="row card-container">
          {orders.map((order, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Table Number: {order.tableNumber}
                  </h5>
                  <p className="card-text">Order Name: {order.orderName}</p>
                  <p className="card-text">Status: {order.status}</p>
                  {order.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => completeOrder(index)}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => cancelOrder(index)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
