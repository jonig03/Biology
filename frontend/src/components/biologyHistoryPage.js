import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";

export default class App extends React.Component {
  state = {
    value: 0,
    previous: 0,
    VALUES: ["1665", "1991"],
    content: ["fact1", "fact2"]
  };

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div
          style={{
            width: "60%",
            height: "100px",
            margin: "0 auto"
          }}
        >
          <HorizontalTimeline
            index={this.state.value}
            indexClick={index => {
              this.setState({
                value: index,
                previous: this.state.value
              });
            }}
            values={this.state.VALUES}
          />
        </div>
        <div className="text-center">
          {this.state.content[this.state.value]}
        </div>
      </div>
    );
  }
}
