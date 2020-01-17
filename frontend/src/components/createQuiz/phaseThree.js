import React from "react";

const PhaseThree = props => {
  if (props.currentStep !== 3) return null;
  return (
    <React.Fragment>
      <h1>Phase Three</h1>
      <span>Quiz name:</span>
      <input type="text" />
    </React.Fragment>
  );
};

export default PhaseThree;
