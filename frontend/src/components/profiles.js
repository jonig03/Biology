import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ReactComponent as Team } from "../svg/team.svg";
import { ReactComponent as Loading } from "../svg/loading.svg";
import ListProfiles from "./listProfiles";
import axios from "axios";

class Profiles extends Component {
  state = {
    profiles: [],
    profilesFiltered: [],
    err: false,
    _id: ""
  };
  updateInputValue = evt => {
    const value = evt.target.value.toLowerCase();
    const profiles = this.state.profiles;
    let results = profiles.filter(profile =>
      profile.name.toLowerCase().includes(value)
    );
    this.setState({
      profilesFiltered: results
    });
    console.log(this.state);
  };
  componentDidMount() {
    axios({
      url: "http://localhost:5000/users/profiles",
      method: "GET"
    })
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          profiles: data,
          profilesFiltered: data,
          _id: data._id
        });
      })
      .catch(err => this.setState({ err: true }));
  }
  render() {
    const { profiles } = this.state;
    return (
      <React.Fragment>
        <div className="text-center mb-3">
          <Team className="kidLearningSVG mx-auto" />
        </div>
        <div className="rounded border border-dark">
          <InputGroup>
            <FormControl
              placeholder="Search for a profile"
              aria-label="Profile search"
              aria-describedby="basic-addon2"
              onChange={this.updateInputValue}
            />
          </InputGroup>
          <ul className="topicsContainer p-4 m-0">
            {profiles.length === 0 ? (
              <Loading />
            ) : (
              <ListProfiles profiles={profiles} />
            )}
          </ul>
        </div>
      </React.Fragment>
    );
    // also set background image of a kid learning in class and put a list of topics or quizez that are a avaliable to learn
  }
}

export default Profiles;
