import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const ScanQR = () => {
  const [data, setData] = useState("No result");
  return (
    <div className="scan-page">
      <div className="qr-container">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
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
