import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Quantity of Items within range"
            },
            legend: {
              display: false
            }
          },
        //   scales: {
        //     y: {
        //       ticks: {
        //         callback: function(value) {
        //           return  value/1000; 
        //         }
        //       }
        //     }
        //   }
        }}
      />
    </div>
  );
};

export default BarChart;
