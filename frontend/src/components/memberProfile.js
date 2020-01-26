import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Loading } from "../svg/loading.svg";
import "../css/profile/index.css";
import { ReactComponent as Settings } from "../svg/settings.svg";
import axios from "axios";

const ProfileMember = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState({ isErr: false, message: "" });
  const [avatar, setAvatar] = useState();
  let { username } = useParams();

  console.log(useParams());
  useEffect(() => {
    console.log(username);

    async function fetchData() {
      axios({
        method: "GET",
        url: "http://localhost:5000/users/" + username
      })
        .then(res => {
          const data = res.data;
          console.log(data);
          setUserDetails(data);
          setIsLoading(false);
          try {
            setAvatar(require(`../usersMedia/${data.userID}/Avatar.png`));
          } catch (e) {
            console.log("oh no big error");
            setAvatar(false);
            console.log(e);
          }
        })
        .catch(err => {
          setIsLoading(false);
          if (err.response.status === 403) {
            setErr({
              isErr: true,
              message:
                "Something went wrong, please check the URL and try again later"
            });
          } else {
            setErr({
              isErr: true,
              message: err.response.statusText
            });
          }
          console.log(err.response);
        });
    }
    fetchData();
  }, [username]);

  if (isLoading) return <Loading />;
  if (avatar === null) return <Loading />;
  if (err.isErr) return <h1>{err.message}</h1>;
  return (
    <React.Fragment>
      <header
        className="border-bottom border-dark rounded d-flex"
        id="headerProfile"
      >
        {!avatar ? null : (
          <img
            src={avatar}
            className="rounded-circle border border-dark shadow"
            style={{ width: "106px", height: "106px" }}
            alt="Avatar user"
          />
        )}
        <h1 className="display-4 ml-3 d-flex align-items-center">
          <span className="text-dark">{userDetails.username}</span>
          <span className="badge badgeBlueColor badgeSizeProfile text-uppercase">
            user
          </span>
        </h1>
        <Settings className="ml-auto w-6" />
      </header>
      <section className="mt-5">
        <span>Learned tracks:</span>
      </section>
    </React.Fragment>
  );
};

export default ProfileMember;
