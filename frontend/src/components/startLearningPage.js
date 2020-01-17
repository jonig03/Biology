import React, { Component } from "react";
import topics from "../data/topics.json";
import Topic from "../containers/topic";
import "../css/topics/index.css";
import "../css/topics/topics.css";
import { ReactComponent as Icon } from "../svg/cellIcon.svg";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { ReactComponent as KidLearning } from "../svg/kidLearning.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class StartLearningPage extends Component {
  state = {
    value: "",
    topics,
    nameFilter: "Filter"
  };
  updateInputValue = evt => {
    const value = evt.target.value.toLowerCase();
    let results = topics.filter(topic =>
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
    return (
      <React.Fragment>
        <Carousel width="25%" className="m-auto" centerMode={truer}>
          <div>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="assets/2.jpeg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="assets/3.jpeg" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>

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
          {this.state.topics.map(topic => (
            <Topic topic={topic} key={topic.name}>
              <Icon />
            </Topic>
          ))}
        </div>
      </React.Fragment>
    );
    // also set background image of a kid learning in class and put a list of topics or quizez that are a avaliable to learn
  }
}

export default StartLearningPage;
