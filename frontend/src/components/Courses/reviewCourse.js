import React from "react";
import Chip from "@material-ui/core/Chip";

import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./css/index.css";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";

const ReviewCourse = () => {
  const { courseName } = useParams();

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
      <section>
        <div className="mixed-box bg-dark d-flex justify-content-center align-items-center text-light flex-column rounded">
          <h1 className="mb-0">Cell Organs</h1>
          <h4 className="text-white-50">40-min Reading Course</h4>
          <button type="button" className="btn btn-primary btn-light text-dark">
            {/* <Link className="text-dark" to={`/${courseName}`}>
              Start Course
            </Link> */}
            <a href={`${courseName}/qwe`}>Start Course</a>
          </button>
        </div>
        <div className="container">
          <div className="mt-3 course-tags pb-3">
            <Chip size="small" label="Biology" className="mr-1" />
            <Chip size="small" label="Cell" className="mr-1" />
          </div>
          <div className="mt-4 d-flex flex-row">
            <div className="course-info">
              <div>
                <h4>About this Course</h4>
                <p>Learn how cell organs work and oprate</p>
              </div>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <PriorityHighRoundedIcon className="border border-dark rounded-circle mr-2" />
                  Subject one
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <PriorityHighRoundedIcon className="border border-dark rounded-circle mr-2" />
                  Subject Two
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <PriorityHighRoundedIcon className="border border-dark rounded-circle mr-2" />
                  Subject Three
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <div className="course-auther">Auther</div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ReviewCourse;
