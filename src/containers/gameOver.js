import React from "react";
import Graph from "../API_components/graph_linear";
const GameOver = props => {
  const { score, correctAnswers, totalQuestions, history } = props;
  let label1 = {
    label: "Series 1",
    data: history
  };
  let label2 = {
    label: "Series 2",
    data: history
  };
  console.log(history);

  return (
    <div>
      <h1>Game Over!</h1>
      <div>Your score is: {score}</div>
      <div>
        You've answered {correctAnswers} out of
        {totalQuestions}
        <Graph labelOneData={label1} labelTwoData={label2} />
      </div>
    </div>
  );
};

export default GameOver;
