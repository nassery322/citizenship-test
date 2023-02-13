import { Fragment, useEffect, useState } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const [barThickness, setBarThickness] = useState(60);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 800) {
        setBarThickness(40);
      }

      if (window.innerWidth < 600) {
        setBarThickness(20);
        setHeight(300);
      } else {
        setHeight(null);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [window.innerWidth]);

  return (
    <section className="bar-chart">
      <Bar
        height={height && height}
        data={props.data}
        options={{
          barThickness: barThickness,
          responsive: true,

          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                minRotation: 20,
              },
            },
            y: {
              border: {
                display: false,
              },
              ticks: {
                stepSize: 5,
                maxTicksLimit: 5,
              },
            },
          },
        }}
      />
    </section>
  );
};

export default BarChart;
