import React, { Component } from "react";
import topics from "../data/topics.json";
import Topic from "../containers/topic";
class StartLearningPage extends Component {
  state = {
    value: "",
    topics
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
  render() {
    return (
      <div>
        <div className="container">
          <input onChange={this.updateInputValue} />
          <div className="topicsContainer">
            {this.state.topics.map(topic => (
              <Topic content={topic.name} key={topic.name} />
            ))}
          </div>
        </div>
      </div>
    );
    // also set background image of a kid learning in class and put a list of topics or quizez that are a avaliable to learn
  }
}

export default StartLearningPage;
