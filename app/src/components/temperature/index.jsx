import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Thermometer from "react-thermometer-ecotropy";
const ENDPOINT = process.env.PUBLIC_URL;

const Temperature = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    let socket = io(ENDPOINT, {
      secure: true,
      transports: ["websocket"],
    });
    socket.on("température", (temp) => {
      setTemp(Number(temp));
    });
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
  }, [ENDPOINT]);
  return (
    <div className="mb-5">
      <h3 className="m-2">{temp + " °C"}</h3>
      <Thermometer
        theme="light"
        value={temp}
        max={"80"}
        steps="1"
        format={"-40"}
        size="large"
        height={window.innerWidth >= 768 ? "300" : "300"}
        tooltipValue={true}
      />
    </div>
  );
};

export default Temperature;
