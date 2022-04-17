import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Thermometer from "react-thermometer-ecotropy";
import { Humidity as Humid } from "react-environment-chart";
const ENDPOINT = process.env.PUBLIC_URL;

const Humidity = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    let socket = io(ENDPOINT, {
      secure: true,
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("humidité", (temp) => {
      setTemp(Number(temp));
    });
  }, [ENDPOINT]);
  return (
    <div className="mb-5">
      <div className="text-center">
        <h3 className="m-2">{temp + "%"}</h3>
      </div>
      {/* <Thermometer
        theme="light"
        value={temp}
        max={"100"}
        steps="1"
        format={"0"}
        size="large"
        height={window.innerWidth >= 768 ? "450" : "300"}
        tooltipValue={true}
      /> */}
      <Humid value={temp} tips={["Bas", "Confort", "Elevé"]} height={180} />
    </div>
  );
};

export default Humidity;
