import React, { useEffect, useState } from "react";
import Quiz from "../components/quiz";
import GameOver from "../containers/gameOver";
import "../css/quiz/style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Loading } from "../svg/loading.svg";

const QuizPage = props => {
  const { username, idQuiz } = useParams();
  const [QuizData, setQuizData] = useState(null);
  const [QuizDetails, setQuizDetails] = useState({
    currentQuestion: 0,
    correctAnswers: 0,
    gameOn: true,
    history: [{ x: 0, y: 0 }]
  });

  const handleClick = answerObject => {
    let data = { ...QuizDetails };
    if (answerObject.isCorrect) data.correctAnswers++;
    let answerDetails = {
      x: QuizDetails.currentQuestion + 1,
      y: data.correctAnswers
    };
    data.history.push(answerDetails);
    if (QuizDetails.currentQuestion + 1 === QuizData.amountQuestions) {
      data.gameOn = false;
    } else {
      data.currentQuestion++;
    }

    setQuizDetails(prevState => ({ ...prevState, ...data }));
    console.log(QuizDetails.history);
  };
  const scoreOutput = correctAnswers => {
    return correctAnswers * 10;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/quiz/${username}/${idQuiz}`
    }).then(response => {
      const quiz = response.data.quiz[0];
      console.log(response.data.quiz);

      setQuizData(quiz);
      console.log(QuizData);
    });
  }, []);

  if (!QuizData) return <Loading />;
  return QuizDetails.gameOn ? (
    <Quiz
      handleClick={handleClick}
      scoreOutput={scoreOutput}
      quizData={QuizData}
      quizDetails={QuizDetails}
    />
  ) : (
    <GameOver
      score={scoreOutput(QuizDetails.correctAnswers)}
      correctAnswers={QuizDetails.correctAnswers}
      totalQuestions={QuizData.amountQuestions}
      history={QuizDetails.history}
    />
  );
};

export default QuizPage;
