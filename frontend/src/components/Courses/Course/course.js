import React, { useState, useEffect } from "react";

import {
  Divider,
  Tooltip,
  Container,
  CircularProgress
} from "@material-ui/core";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import { LinearProgress } from "@material-ui/core";

import "./course.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderCourse from "./components/header";

const Course = () => {
  const [Content, setContent] = useState(null);
  const [IsErr, setIsErr] = useState(null);
  const { stageCourse, topicName, courseName } = useParams();
  const [IsLoggedIn, setLoggedIn] = useState(null);
  const [completed, setCompleted] = useState(50);
  let steps = [];
  const amountSteps = 4;

  useEffect(() => {
    //Ask from server course details
    // axios({
    //   method: "get",
    //   url: `http://localhost:5000/courses/${courseName}/config`
    // }).then(res => {
    //   const { data } = res;
    //   console.log(res);
    // });
    axios({
      method: "get",
      url: `http://localhost:5000/courses/${topicName}/${courseName}/${stageCourse}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("BiologyPen")}`
      }
    })
      .then(async res => {
        // const data = await res.json();
        console.log(res);
        if (res.status === 404) {
          setIsErr(res.statusText);
          setLoggedIn(false);
          console.log(IsLoggedIn);

          return false;
        } else if (res.status === 403) {
          setLoggedIn(false);
          return false;
        }
        setLoggedIn(true);
        const text = await res.data;
        //Update state, Change line spaces to invisible <br />.
        setContent(
          Array.from(text.split("\n"), item =>
            item.length === 1 ? <br /> : <div>{item}</div>
          )
        );
      })
      .catch(err => {
        console.log(err);
        setLoggedIn(true);
        setIsErr(true);
        if (err.status === 404) {
          setLoggedIn(true);
          console.log(err);
        }
      });
  }, []);
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
  if (IsLoggedIn === null) return <CircularProgress />;
  console.log(IsErr);
  if (IsErr) {
    return (
      <h1>
        {IsErr} <br /> Please navigate back to review course and try again.
      </h1>
    );
  }
  return (
    <React.Fragment>
      <HeaderCourse />
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
              style={{
                width: "100%",
                position: "relative",
                top: "25px"
              }}
            />
            <ul className="d-flex flex-direction-row p-0 align-items-center text-light m-0 steps-list-course">
              {steps}
            </ul>
          </div>
        </div>
        <div className="containerContentCourse pt-4">
          {!Content ? (
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

              <div>{Content}</div>
            </Container>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Course;
