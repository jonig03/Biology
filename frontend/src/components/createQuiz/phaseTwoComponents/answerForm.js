import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Tab from "react-bootstrap/Tab";

const AnswerForm = props => {
  const { index, answer, indexQuestion, setCorrect } = props;
  console.log(props);
  const numberAnswer = index + 1;
  return (
    <React.Fragment>
      <h1>Answer #{numberAnswer}</h1>
      answer:
      <input
        type="text"
        onChange={e => props.updateDetails(e, index, indexQuestion, "answer")}
        defaultValue={answer.answer}
      />
      <br />
      <Checkbox
        checked={answer.isCorrect}
        onChange={e => setCorrect(index, indexQuestion)}
        value="primary"
        inputProps={{
          "aria-label": "primary checkbox"
        }}
        name={`${index}`}
      />
    </React.Fragment>
  );
};

export default AnswerForm;
