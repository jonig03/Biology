import React from "react";

const PhaseOne = props => {
  const { name, desc } = props.values;
  if (props.currentStep !== 1) return null;
  return (
    <React.Fragment>
      <h1>Phase One</h1>
      <div>
        <span>Quiz name:</span>
        <input
          type="text"
          name="name"
          onChange={props.onChange}
          defaultValue={name}
          required
        />
      </div>
      <div>
        <span>Quiz Description:</span>
        <input
          type="text"
          name="desc"
          onChange={props.onChange}
          defaultValue={desc}
          required
        />
      </div>
    </React.Fragment>
  );
};

export default PhaseOne;
