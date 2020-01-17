import React, { Component } from "react";
import Answer from "../containers/answer";
// import quiz from "../data/quiz.json";

class Quiz extends Component {
  state = {
    history: []
  };

  render() {
    const { handleClick, scoreOutput, quizData, quizDetails } = this.props;
    const { questions } = quizData;
    console.log(quizData);
    const { currentQuestion } = quizDetails;
    const questionData = questions[currentQuestion];
    const allAnswers = questionData.answers;
    const questionText = questionData.question;

    return (
      <div className="quizContainer">
        <h1 className="quizQuestion text-dark">{questionText}</h1>
        <div className="answerContainer">
          {allAnswers.map((answerData, index) => (
            <Answer
              key={index}
              answerData={answerData}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div>score: {scoreOutput(quizDetails.correctAnswers)}</div>
      </div>
    );
  }
}

export default Quiz;
