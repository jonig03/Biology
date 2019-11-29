import React from "react";
import { Chart } from "react-charts";

function GraphLinear(props) {
  const { labelOneData, labelTwoData } = props;
  const data = React.useMemo(
    () => [
      // {
      //   label: "Series 1",
      //   data: [
      //     [0, 1],
      //     [1, 2],
      //     [2, 4],
      //     [3, 2],
      //     [4, 7]
      //   ]
      // },
      labelOneData,
      labelTwoData
    ],
    [labelOneData, labelTwoData]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <div
      style={{
        width: "400px",
        height: "300px"
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
  // A react-chart hyper-responsively and continuusly fills the available
  // space of its parent element automatically
}

export default GraphLinear;
