import React from "react";
import { useSelector, useDispatch } from "react-redux";
import topicLearned from "../redux/actions/studyProgress";
import addStudy from "../redux/actions/addTopicStudyProgress";
import Form from "react-bootstrap/Form";

function StudyProgress() {
  const dispatch = useDispatch();
  const topics = useSelector(state => state.studyProgress).topics;
  let input;
  return (
    <div>
      <h1>Study progress</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addStudy(Math.round(Math.random()) + 7, input.value));
          input.value = "";
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add</button>
      </form>

      {topics.map(topic => (
        <div key={topic.id} className={topic.studied ? "crossed-over" : ""}>
          <Form.Check
            custom
            type="checkbox"
            id={`custom-checkbox${topic.id}`}
            label={topic.name}
            onChange={() => dispatch(topicLearned(topic.id))}
            defaultChecked={topic.studied ? "checked" : ""}
          />
        </div>
      ))}
    </div>
  );
}

export default StudyProgress;
