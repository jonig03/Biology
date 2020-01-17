import React from "react";
import Graph from "../API_components/graph_linear";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const GameOver = props => {
  const { score, correctAnswers, totalQuestions, history } = props;
  const [typeChart, setTypeChart] = React.useState("line");
  const classes = useStyles();

  let label1 = {
    label: "Series 1",
    data: history
  };
  let label2 = {
    label: "Series 2",
    data: history
  };

  console.log(history);

  return (
    <div>
      <h1>Game Over!</h1>
      <div>Your score is: {score}</div>
      <div>
        You've answered {correctAnswers} correct answers out of {totalQuestions}
        total questions!
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeChart}
            onChange={event => setTypeChart(event.target.value)}
            defaultValue={"line"}
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="stepLine">Step line</MenuItem>
            <MenuItem value="spline">Spline</MenuItem>
          </Select>
        </FormControl>
        <Graph
          labelOneData={label1}
          labelTwoData={label2}
          title="Quiz Chart"
          type={typeChart}
        />
      </div>
    </div>
  );
};

export default GameOver;
