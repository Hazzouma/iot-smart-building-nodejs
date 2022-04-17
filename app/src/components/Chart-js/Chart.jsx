import React from "react";
import { Line } from "react-chartjs-2";

function Charte() {
  const lineChartData = {
    labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    datasets: [
      {
        label: "Température Salle 1",
        data: [10, 59, 80, 81, 56, 55, 40, 90, 66, 88, 69],
        borderColor: "red",
        //   backgroundColor: "rgba(145, 46, 252, 0.4)",
        borderWidth: 2,
      },
      {
        label: "Température Salle 2",
        data: [28, 48, 40, 19, 9, 27, 50, 77, 50, 66, 22],
        borderColor: "blue",
        //   backgroundColor: "rgba(247, 49, 100, 0.4)",
        borderWidth: 2,
      },
    ],
    plugins: {
      datalabels: {
        display: true,
        color: "white",
      },
    },
  };
  var delayed;
  const options = {
    responsive: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Température des salles",
      },
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  };

  return (
    <div>
      <Line
        options={options}
        data={lineChartData}
        height={390}
        width={790}
        type='line'
      />
    </div>
  );
}

export default Charte;
