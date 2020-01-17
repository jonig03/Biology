import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import PhaseOne from "./createQuiz/phaseOne";
import PhaseTwo from "./createQuiz/phaseTwo";
import PhaseThree from "./createQuiz/phaseThree";
import { ID } from "../functions/";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-block"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const ButtonsForm = props => {
  return (
    <div className="mt-5">
      <PrevButton
        currentStep={props.currentStep}
        handlePrev={props.handlePrev}
      />
      <NextButton
        currentStep={props.currentStep}
        handleNext={props.handleNext}
      />
      <CompleteButton
        currentStep={props.currentStep}
        isSubmited={props.isSubmited}
        isSubmitedSuccesfully={props.isSubmitedSuccesfully}
      />
    </div>
  );
};

const CreateQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [details, setDetails] = useState({
    questions: [],
    id: ID()
  });
  const [isSubmited, setisSubmited] = useState(false);
  const [isSubmitedSuccesfully, setisSubmitedSuccesfully] = useState(false);
  const [count, setCount] = useState(0);

  // name: "",
  // questions: [
  //   {
  //     question: "",
  //     answers: [
  //       { answer: "", isCorrect: false, clue: "" },
  //       { answer: "", isCorrect: false, clue: "" },
  //       { answer: "", isCorrect: true, clue: "" },
  //     ]
  //   }
  // ],
  // amountQuestions: 3

  const next = () => {
    console.log(details);

    return setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = e => {
    e.preventDefault();
    setisSubmited(true);
    axios({
      method: "post",
      url: "http://localhost:5000/quiz/addQuiz",
      headers: {
        authorization: `Bearer ${localStorage.getItem("BiologyPen")}`
      },
      data: details
    }).then(res => {
      console.log(res.data);
      setTimeout(() => {
        setisSubmitedSuccesfully(true);
        setisSubmited(false);
      }, 1400);
    });
  };
  const updateQuestionDetails = e => {
    //Get value
    const value = e.target.value;
    //Get name
    const name = e.target.name;
    //name const should be something like: "name,3":
    //1.Get index
    const index = name.split(",")[1];
    //2.Get key
    const key = name.split(",")[0];

    //Create a copy of our state so we can modify it
    let updatedDetails = details;
    updatedDetails.questions[index][key] = value;

    //Create an object where we will store all of our data
    // let data = { question: name };
    console.log(updatedDetails);

    setDetails(updatedDetails);
  };
  const updateAnswerDetails = (e, indexAnswer, indexQuestion, key) => {
    const value = e.target.value;
    let updatedQuestions = [...details.questions];

    updatedQuestions[indexQuestion].answers[indexAnswer][key] = value;
    console.log(updatedQuestions[indexQuestion].answers[indexAnswer]);
    setDetails(prevState => ({
      ...prevState,
      questions: updatedQuestions
    }));
  };
  const handleIsCorrectAnswer = (indexAnswer, indexQuestion) => {
    //Make a copy of state's questions
    let updatedQuestions = [...details.questions];
    //Store is question correct
    const isCorrect =
      updatedQuestions[indexQuestion].answers[indexAnswer].isCorrect;
    //Change the copy of the state
    updatedQuestions[indexQuestion].answers[indexAnswer].isCorrect = !isCorrect;

    // Merge the copy and the state!
    setDetails(prevState => ({
      ...prevState,
      questions: updatedQuestions
    }));

    // name: "",
    // questions: [
    //   {
    //     question: "",
    //     answers: [
    //       { answer: "", isCorrect: false, clue: "" },
    //       { answer: "", isCorrect: false, clue: "" },
    //       { answer: "", isCorrect: true, clue: "" },
    //     ]
    //   }
    // ],
    // amountQuestions: 3
  };
  const handleChangeInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    const data = {};
    //If its not NaN
    if (!isNaN(value)) {
      data[name] = parseInt(value);
    } else {
      data[name] = value;
    }
    setDetails(prevState => ({
      ...prevState,
      ...data
    }));
  };
  const handleSetQuestions = e => {
    //Get name
    const { name } = e.target;
    //Get value
    const value = parseInt(e.target.value);
    //Create an object that we would store all the new data in
    let data = { questions: [] };

    //Check if value is not a number
    if (isNaN(value)) return alert("Not A Number!");

    //Set amount of questions
    data[name] = value;
    //Run for every question for adding array
    for (let i = 0; i < value; i++) {
      data.questions.push({
        question: "",
        clue: "",
        answers: [
          {
            answer: "",
            isCorrect: false
          },
          {
            answer: "",
            isCorrect: false
          },
          {
            answer: "",
            isCorrect: false
          }
        ]
      });
    }
    //Merge the state and the data stored in data variable
    setDetails(prevState => ({
      ...prevState,
      ...data
    }));
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <PhaseOne
          currentStep={currentStep}
          onChange={handleChangeInput}
          values={{
            name: details.name,
            desc: details.desc
          }}
        />
        <PhaseTwo
          currentStep={currentStep}
          onChange={handleChangeInput}
          updateDetails={updateQuestionDetails}
          setQuestions={handleSetQuestions}
          values={{
            amountQuestions: details.amountQuestions,
            questions: details.questions
          }}
          updateAnswerDetails={updateAnswerDetails}
          setCorrectAnswer={handleIsCorrectAnswer}
        />
        <PhaseThree currentStep={currentStep} />

        <ButtonsForm
          currentStep={currentStep}
          handlePrev={prev}
          handleNext={next}
          isSubmited={isSubmited}
          isSubmitedSuccesfully={isSubmitedSuccesfully}
        />
      </form>
    </React.Fragment>
  );
};

const PrevButton = props => {
  if (props.currentStep !== 1) {
    return (
      <button onClick={props.handlePrev} className="mr-2" type="button">
        Previous
      </button>
    );
  }
  return null;
};

const NextButton = props => {
  if (props.currentStep !== 3) {
    return (
      <button className="mr-2" onClick={props.handleNext} type="button">
        Next
      </button>
    );
  }
  return null;
};

const CompleteButton = props => {
  const classes = useStyles();
  const timer = React.useRef();
  // const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  console.log(props);
  let buttonClassname = clsx({
    [classes.buttonSuccess]: props.isSubmitedSuccesfully
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  if (props.currentStep === 3) {
    return (
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={props.isSubmited}
          onClick={props.handleSubmit}
          type="submit"
        >
          Create Quiz!
        </Button>
        {props.isSubmited && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
      // <button className="m-0 mr-2 btn btn-success" onClick={props.handleNext}>
      //   Complete
      // </button>
    );
  }
  return null;
};

export default CreateQuiz;
