import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import io from "socket.io-client";
const ENDPOINT = process.env.PUBLIC_URL;

function HumidityGraph() {
  const options = {
    chart: {
      width: 855,
      height: 320,
      id: "realtime",
      type: "line",
      animations: {
        enabled: false,
        easing: "linear",
        speed: 900,
      },
    },
    colors: ["red", "blue"],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    yaxis: [
      {
        tickAmount: 1,
        min: 0,
        max: 110,
        title: {
          text: "Humidité en %",
        },
      },
    ],
    xaxis: {
      axisTicks: {
        show: true,
      },
      label: {
        format: "ss",
      },
      title: { text: "Chaque 5 secondes" },
    },
    dataLabels: {
      position: "top",
      enabled: true,
    },
    fill: {
      colors: ["red", "blue"],
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        // shadeIntensity: 0.4,
        // inverseColors: false,
        // opacityFrom: 0.8,
        // opacityTo: 0.2,
        stops: [0, 0], //loun ghama9 felkher il courbe
      },
    },
    tooltip: {
      shared: true,
    },
    title: {
      text: "Humidité pièce 1",
    },
  };

  const [newData, setNewData] = useState(0);
  // eslint-disable-next-line
  const [series, setSeries] = useState([
    {
      name: "Salle 1",
      type: "line",
      data: [],
    },
  ]);
  //socket connection
  useEffect(() => {
    let socket = io(ENDPOINT, {
      secure: true,
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("humidité", (tem) => {
      setNewData(tem);
      if (series[0].data.length <= 19) {
        series[0].data.push(tem);
        setSeries(series);
      } else {
        series[0].data.shift();
        series[0].data.push(tem);
        setSeries(series);
      }
    });
  }, [ENDPOINT]);

  return (
    <div>
      <Chart options={options} series={series} height="300" />
    </div>
  );
}

export default HumidityGraph;
