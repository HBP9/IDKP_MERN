import React from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const ScanQR = () => {
  let navigate = useNavigate();
  const getParamsFromURL = (url) => {
    const params = new URLSearchParams(url.split("?")[1]);
    const tableName = params.get("tableName");
    const adminId = params.get("adminId");
    return { tableName, adminId };
  };
  return (
    <div className="scan-page">
      <div className="qr-container">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              const scanPath = result.getText();
              const { tableName, adminId } = getParamsFromURL(scanPath);
              navigate(`/getMenu/${tableName}/${adminId}`);
            }
            if (!!error) {
              console.log(error);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ScanQR;
