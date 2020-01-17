import React from "react";
import Tabs from "react-bootstrap/Tabs";
import AnswerForm from "./answerForm";
import Tab from "react-bootstrap/Tab";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const QuestionForm = props => {
  const { index, questions, updateQuestionDetails } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const numberQuestion = index + 1;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <h1>Question Number: {numberQuestion}</h1>
      Question name:
      <input
        type="text"
        name={`question,${index}`}
        onChange={updateQuestionDetails}
        defaultValue={questions[index].question}
      />
      Clue:
      <input
        type="text"
        name={`clue,${index}`}
        onChange={updateQuestionDetails}
        defaultValue={questions[index].clue}
      />
      {/* <Tabs defaultActiveKey={`answer1`} id="uncontrolled-tab-example"> */}
      <div className={classes.root}>
        {questions[index].answers.map((answer, i) => (
          // <Tab eventKey={`answer${i + 1}`} title={`Answer #${i + 1}`} key={i}>
          //   <AnswerForm
          //     answer={answer}
          //     index={i}
          //     setCorrect={props.setCorrectAnswer}
          //     updateDetails={props.updateAnswerDetails}
          //     indexQuestion={index}
          //   />
          // </Tab>
          <ExpansionPanel
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                Answer #{i + 1}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {!answer.answer ? "Havent set an answer yet!" : answer.answer}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AnswerForm
                answer={answer}
                index={i}
                setCorrect={props.setCorrectAnswer}
                updateDetails={props.updateAnswerDetails}
                indexQuestion={index}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </React.Fragment>
  );
};

export default QuestionForm;
