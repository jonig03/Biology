import React from "react";
import "./css/index.css";
import "./css/topic.css";

const Topic = props => {
  const topic = props.topic;
  const { name } = topic;

  return <div className="topic">{topic}</div>;
};

export default Topic;
