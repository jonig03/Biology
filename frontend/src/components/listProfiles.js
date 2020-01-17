import React from "react";
import Profile from "./profileListItem";

const ListProfiles = props => {
  const { profiles } = props;
  console.log(profiles);
  return (
    <React.Fragment>
      {profiles.slice(0, 6).map((profile, index) => (
        <Profile profile={profile} key={index} /> //image={avatar}
      ))}
    </React.Fragment>
  );
};

export default ListProfiles;
