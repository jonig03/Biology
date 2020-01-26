import React, { useState, useEffect } from "react";

import { Divider, Tooltip, Container } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import { LinearProgress } from "@material-ui/core";

import "./course.css";

const Course = () => {
  const [Introduction, setIntroduction] = useState(null);
  useEffect(() => {
    //Ask from server course details
    fetch("http://localhost:5000/courses/introduction")
      .then(async res => {
        // const data = await res.json();
        const text = await res.text();
        console.log(text);
        //Update state, Change line spaces to invisible <br />.
        setIntroduction(
          Array.from(text.split("\n"), item =>
            item.length === 1 ? <br /> : <div>{item}</div>
          )
        );
      })
      .catch(err => console.error(err));
  }, []);

  const [completed, setCompleted] = useState(50);
  let steps = [];
  const amountSteps = 4;

  for (let index = 0; index < amountSteps; index++) {
    steps[index] = (
      <Tooltip title="ToolTip">
        <div
          className="step bg-dark rounded-circle p-1"
          key={index}
          onClick={() => {
            setCompleted((100 / amountSteps) * index);
            console.log(completed);
          }}
        >
          <LocalLibraryOutlinedIcon className="course-icon" />
        </div>
      </Tooltip>
    );
  }
  console.log(Introduction);

  return (
    <React.Fragment>
      <header className="pb-2">
        <button
          type="button"
          className="bg-white rounded d-flex align-items-center"
        >
          <KeyboardBackspaceIcon className="text-dark" />
          Back
        </button>
      </header>
      <section className="rounded course-section border border-dark">
        <div className="progress-course bg-dark rounded">
          <LinearProgress
            variant="determinate"
            value={completed}
            style={{ height: "15px" }}
          />
          <div className="steps-course container">
            <Divider
              className="dividerSteps bg-light"
              style={{ width: "100%", position: "relative", top: "25px" }}
            />
            <ul className="d-flex flex-direction-row p-0 align-items-center text-light m-0 steps-list-course">
              {steps}
            </ul>
          </div>
        </div>
        <div className="containerContentCourse pt-4">
          {!Introduction ? (
            <div className="container p-2">
              <LinearProgress />
            </div>
          ) : (
            <Container maxWidth="md" className="p-2">
              <header className="headerCourse text-center">
                <h4 className="sub-title-course text-secondary">
                  What we will be learning?
                </h4>
                <h2>Cell Membrane</h2>
              </header>

              <div>{Introduction}</div>
            </Container>

            // <React.Fragment>
            //   <h4 className="sub-title-course text-secondary">
            //     What we will be learning?
            //   </h4>
            //   <h2>What is it?</h2>
            //   <button
            //     type="button"
            //     className="btn"
            //     onClick={() => setCompleted(100)}
            //   >
            //     Complete
            //   </button>
            // </React.Fragment>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Course;
