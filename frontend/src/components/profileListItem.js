import React, { useState, useEffect } from "react";
import { ReactComponent as Loading } from "../svg/loading.svg";
import { Link } from "react-router-dom";

const Profile = props => {
  console.log(props);
  const { profile } = props;
  const [avatar, setAvatar] = useState(null);
  console.log(props);
  useEffect(() => {
    try {
      console.log(profile._id);
      setAvatar(require(`../usersMedia/${profile._id}/Avatar.png`));
    } catch (e) {
      console.log("oh no big error");
      setAvatar(false);
      console.log(e);
    }
  }, [profile._id]);

  if (avatar === null) return <Loading />;

  return (
    <li className="card shadow w-25">
      {!avatar ? null : (
        <img className="card-img-top" src={avatar} alt="Avatar user" />
      )}
      <div className="card-body">
        <h5 className="card-title">{profile.username}</h5>
        <p className="card-text">profile.describtion qwewqewqqwesadsadsad</p>
        <Link to={`/${profile.username}`}>
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ maxWidth: "87%" }}
          >
            go to {profile.username}s profile.
          </button>
        </Link>
      </div>
    </li>
  );
};

export default Profile;
