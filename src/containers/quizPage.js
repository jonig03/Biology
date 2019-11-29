import React from "react";
import Quiz from "../components/quiz";
import GameOver from "../containers/gameOver";
import "../css/quiz/style.css";

const QuizPage = props => {
  const scoreOutput = correctAnswers => {
    return correctAnswers * 10;
  };
  const { quizData, handleClick } = props;
  return quizData.gameOn ? (
    <div className="container quiz" data-aos="zoom-in">
      <Quiz
        handleClick={handleClick}
        scoreOutput={scoreOutput}
        quizData={quizData}
      />
    </div>
  ) : (
    <GameOver
      score={scoreOutput(quizData.correctAnswers)}
      correctAnswers={quizData.correctAnswers}
      totalQuestions={quizData.totalQuestions}
      history={quizData.history}
    />
  );
};

export default QuizPage;
