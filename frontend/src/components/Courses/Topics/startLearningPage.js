import React, { Component } from "react";
import Topic from "./topic";
import { ReactComponent as Icon } from "../../../svg/cellIcon.svg";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { ReactComponent as KidLearning } from "../../../svg/kidLearning.svg";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/index.css";
import "./css/topic.css";

class StartLearningPage extends Component {
  state = {
    value: "",
    topics: null,
    nameFilter: "Filter"
  };
  componentDidMount() {
    fetch("http://localhost:5000/courses/topics").then(async res => {
      const data = await res.json();
      console.log(data);
      this.setState(prevState => ({ ...prevState, topics: data }));
    });
  }
  updateInputValue = evt => {
    const value = evt.target.value.toLowerCase();
    let results = this.state.topics.filter(topic =>
      topic.name.toLowerCase().includes(value)
    );
    this.setState({
      topics: results
    });
  };
  onChangeFilter = event => {
    const text = event.target.text;
    let updatedState = this.state;
    updatedState.nameFilter = text;
    this.setState(updatedState);
  };
  render() {
    const truer = true;
    console.log(!this.state.topics);
    return (
      <React.Fragment>
        <div className="text-center mb-3">
          <KidLearning className="kidLearningSVG mx-auto" />
        </div>

        <InputGroup>
          <FormControl
            placeholder="Search for a topic"
            aria-label="Topic search"
            aria-describedby="basic-addon2"
            onChange={this.updateInputValue}
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title={this.state.nameFilter}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={this.onChangeFilter}>Filter</Dropdown.Item>
            <Dropdown.Item onClick={this.onChangeFilter}>Action</Dropdown.Item>
            <Dropdown.Item onClick={this.onChangeFilter}>
              Another action
            </Dropdown.Item>
            <Dropdown.Item onClick={this.onChangeFilter}>
              Something else here
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.onChangeFilter}>
              Separated link
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <div className="topicsContainer">
          {!this.state.topics ? (
            <CircularProgress />
          ) : (
            this.state.topics.map(topic => (
              <Link to={`/startLearning/${topic}`}>
                <Topic topic={topic} key={topic}>
                  <Icon />
                </Topic>
              </Link>
            ))
          )}
        </div>
      </React.Fragment>
    );
    // also set background image of a kid learning in class and put a list of topics or quizez that are a avaliable to learn
  }
}

export default StartLearningPage;
