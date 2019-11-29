import React, { Component } from "react";
import QuizPage from "./containers/quizPage";
import Home from "./containers/home";
import Header from "./containers/header";
import BiologyHistoryPage from "./components/biologyHistoryPage";
import StartLearningPage from "./components/startLearningPage";
import StudyProgress from "./components/studyProgress";
import CreateQuiz from "./components/createQuiz";
import Game from "./components/game";
import quiz from "./data/quiz.json";
import "./css/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    quiz: {
      questionNumber: 0,
      correctAnswers: 0,
      totalQuestions: quiz.questions.length,
      gameOn: true,
      history: []
    }
  };
  handleClick = answerObject => {
    let updatedState = this.state;
    if (answerObject.correct) updatedState.quiz.correctAnswers++;
    if (this.state.quiz.questionNumber + 1 === quiz.questions.length) {
      updatedState.quiz.gameOn = false;
    } else {
      updatedState.quiz.questionNumber++;
    }
    let move = [
      updatedState.quiz.questionNumber,
      updatedState.quiz.correctAnswers
    ];
    updatedState.quiz.history.push(move);
    this.setState(updatedState);
  };
  // addQuiz = (title, question) => {
  //   let updatedState = this.state;

  // };
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home facts={this.state.facts} />
            </Route>
            <Route path="/quiz">
              <QuizPage
                quizData={this.state.quiz}
                handleClick={this.handleClick}
              />
            </Route>
            <Route path="/createQuiz">
              <CreateQuiz />
            </Route>
            <Route path="/biologyHistory">
              <BiologyHistoryPage />
            </Route>
            <Route path="/startLearning">
              <StartLearningPage />
            </Route>
            <Route path="/studyProgress">
              <StudyProgress />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
