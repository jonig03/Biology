import React from "react";
import "../css/topics/index.css";
import "../css/topics/topic.css";

const Topic = props => {
  const topic = props.topic;
  const { name } = topic;

  return <div className="topic">{name}</div>;
};

export default Topic;
