import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import QuestionForm from "./phaseTwoComponents/questionForm";
import Tab from "react-bootstrap/Tab";

const PhaseTwo = props => {
  const [key, setKey] = useState("question0");
  const { values, updateDetails, setCorrectAnswer } = props;
  if (props.currentStep !== 2) return null;
  let questions = [];

  for (let i = 0; i < values.amountQuestions; i++) {
    const index = i;
    const numberQuestion = i + 1;
    questions.push(
      <Tab
        eventKey={`question${index}`}
        title={`Question #${numberQuestion}`}
        key={index}
      >
        <QuestionForm
          index={i}
          questions={values.questions}
          updateQuestionDetails={updateDetails}
          updateAnswerDetails={props.updateAnswerDetails}
          setCorrectAnswer={setCorrectAnswer}
          key={i}
        />
      </Tab>
    );
  }

  return (
    <React.Fragment>
      <h1>Phase Two</h1>
      <div>
        <span>How many questions would you like in your quiz?</span>
        <input
          name="amountQuestions"
          type="number"
          onChange={props.setQuestions}
          defaultValue={values.amountQuestions}
        />
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        {questions.map(question => question)}
      </Tabs>
    </React.Fragment>
  );
};

export default PhaseTwo;
