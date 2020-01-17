import React, { Component } from "react";
import { Chart } from "react-charts";
import CanvasJSReact from "../API_components/assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// function GraphLinear(props) {
//   // const { labelOneData, labelTwoData } = props;

//   // const data = React.useMemo(
//   //   () => [
//   //     // {
//   //     //   label: "Series 1",
//   //     //   data: [
//   //     //     [0, 1],
//   //     //     [1, 2],
//   //     //     [2, 4],
//   //     //     [3, 2],
//   //     //     [4, 7]
//   //     //   ]
//   //     // },
//   //     labelOneData,
//   //     labelTwoData
//   //   ],
//   //   [labelOneData, labelTwoData]
//   // );

//   // const axes = React.useMemo(
//   //   () => [
//   //     { primary: true, type: "linear", position: "bottom" },
//   //     { type: "linear", position: "left" }
//   //   ],
//   //   []
//   // );

//   // return (
//   //   <div
//   //     style={{
//   //       width: "400px",
//   //       height: "300px"
//   //     }}
//   //   >
//   //     <Chart data={data} axes={axes} />
//   //   </div>
//   // );
//   // // A react-chart hyper-responsively and continuusly fills the available
//   // // space of its parent element automatically

//   const options = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light2", // "light1", "dark1", "dark2"
//     title: {
//       text: "Bounce Rate by Week of Year"
//     },
//     axisY: {
//       title: "Bounce Rate",
//       includeZero: false,
//       suffix: "%"
//     },
//     axisX: {
//       title: "Week of Year",
//       prefix: "W",
//       interval: 2
//     },
//     data: [
//       {
//         type: "line",
//         toolTipContent: "Week {x}: {y}%",
//         dataPoints: [
//           { x: 1, y: 64 },
//           { x: 2, y: 61 },
//           { x: 3, y: 64 },
//           { x: 4, y: 62 },
//           { x: 5, y: 64 },
//           { x: 6, y: 60 },
//           { x: 7, y: 58 },
//           { x: 8, y: 59 },
//           { x: 9, y: 53 },
//           { x: 10, y: 54 },
//           { x: 11, y: 61 },
//           { x: 12, y: 60 },
//           { x: 13, y: 55 },
//           { x: 14, y: 60 },
//           { x: 15, y: 56 },
//           { x: 16, y: 60 },
//           { x: 17, y: 59.5 },
//           { x: 18, y: 63 },
//           { x: 19, y: 58 },
//           { x: 20, y: 54 },
//           { x: 21, y: 59 },
//           { x: 22, y: 64 },
//           { x: 23, y: 59 }
//         ]
//       }
//     ]
//   };
//   return (
//     <div>
//       <CanvasJSChart
//         options={options}
//         /* onRef={ref => this.chart = ref} */
//       />
//       {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//     </div>
//   );
// }

// export default GraphLinear;

class SplineChart extends Component {
  render() {
    const { labelOneData, labelTwoData, title, type } = this.props;
    console.log(type);
    const options = {
      animationEnabled: true,
      title: {
        text: title
      },
      axisX: {
        // valueFormatString: "MMM"
        title: "Number question"
      },
      axisY: {
        title: "Correct Answer",
        // prefix: "$"
        includeZero: false
      },
      data: [
        {
          // yValueFormatString: "$#,###",
          // xValueFormatString: "MMMM",
          type,
          dataPoints: labelTwoData.data

          // [
          // { x: new Date(2017, 0), y: 25060 },
          // { x: new Date(2017, 1), y: 27980 },
          // { x: new Date(2017, 2), y: 42800 },
          // { x: new Date(2017, 3), y: 32400 },
          // { x: new Date(2017, 4), y: 35260 },
          // { x: new Date(2017, 5), y: 33900 },
          // { x: new Date(2017, 6), y: 40000 },
          // { x: new Date(2017, 7), y: 52500 },
          // { x: new Date(2017, 8), y: 32300 },
          // { x: new Date(2017, 9), y: 42000 },
          // { x: new Date(2017, 10), y: 37160 },
          // { x: new Date(2017, 11), y: 38400 }
          // ]
        }
      ]
    };

    return (
      <div>
        <h1>React Spline Chart</h1>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default SplineChart;
