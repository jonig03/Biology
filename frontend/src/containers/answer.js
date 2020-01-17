import React, { Component } from "react";

class Answer extends Component {
  state = {};
  render() {
    let { answerData, handleClick } = this.props;
    return (
      <button
        className="btn btn-1"
        // key={answerData.numberAnswer}
        onClick={() => {
          handleClick(this.props.answerData);
        }}
      >
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        {answerData.answer}
      </button>
    );
  }
}

export default Answer;
