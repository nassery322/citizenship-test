import { Fragment, useEffect, useState } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const [barThickness, setBarThickness] = useState(50);

  useEffect(() => {
    const handleWindowResize = () => {

      if (window.innerWidth < 800) {
        setBarThickness(40);
      }

      if (window.innerWidth < 600) {
        setBarThickness(20);
      }else{
        setBarThickness(50)
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
        data={props.data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 1,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
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
