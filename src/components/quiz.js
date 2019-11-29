import React, { Component } from "react";
import Answer from "../containers/answer";
import quiz from "../data/quiz.json";

class Quiz extends Component {
  state = {
    history: []
  };

  render() {
    const { handleClick, scoreOutput, quizData } = this.props;
    const questions = quiz.questions;
    const questionNumber = quizData.questionNumber;
    const question = questions[questionNumber];
    const allAnswers = Object.values(question)[0];
    const questionText = Object.keys(question)[0];

    return (
      <div className="quizContainer">
        <h1 className="quizQuestion">{questionText}</h1>
        <div className="answerContainer">
          {allAnswers.map(answerData => (
            <Answer
              key={answerData.numberAnswer}
              answerData={answerData}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div>score: {scoreOutput(quizData.correctAnswers)}</div>
      </div>
    );
  }
}

export default Quiz;
