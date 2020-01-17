import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ReactComponent as Loading } from "../svg/loading.svg";
import "../css/profile/index.css";
import { ReactComponent as Settings } from "../svg/settings.svg";
import Avatar from "./Avatar/";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState({ isErr: false, message: "" });
  const [nameFile, setNameFile] = useState("Select File");
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  let { username } = useParams();
  console.log(useParams());

  const handleUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setNameFile(file.name);
    setFile(file);
  };
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("image", file);
    axios.post(
      "http://localhost:5000/users/uploadAvatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("BiologyPen")}`
        }
      },
      username
    );
  };
  useEffect(() => {
    console.log(username);

    async function fetchData() {
      console.log(username);
      axios({
        method: "GET",
        url: "http://localhost:5000/users/profile/" + username,
        headers: {
          authorization: `Bearer ${localStorage.getItem("BiologyPen")}`
        }
      })
        .then(res => {
          const data = res.data;
          console.log(res);
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
  }, [username, err]);

  if (isLoading) return <Loading />;
  if (err.isErr) return <h1>{err.message}</h1>;
  console.log(avatar);
  console.log(userDetails.quizzes);
  return (
    <React.Fragment>
      <header
        className="border-bottom border-dark rounded d-flex align-items-center pb-2"
        id="headerProfile"
      >
        <Avatar />
        {/* {!avatar ? null : (
          <img
            src={avatar}
            className="rounded-circle border border-dark shadow mr-3"
            style={{ width: "106px", height: "106px" }}
            alt="Avatar user"
          />
        )} */}
        <h1 className="display-4"></h1>
        <Settings className="ml-auto w-6" />
      </header>
      <section className="mt-5">
        <div className="text-center">Created quizzes:</div>

        <div className="d-flex flex-direction-row flex-wrap">
          {userDetails.quizzes.map(quiz => (
            <div className="card" style={{ width: "10rem" }} key={quiz.id}>
              <div className="card-body">
                <h5 className="card-title">{quiz.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{quiz.desc}</h6>
                <Link to={`/${username}/quiz/${quiz.id}`} className="btn m-0">
                  Open quiz
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* {userDetails.quizzes.map(quiz => (
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="card-link">
                Card link
              </a>
              <a href="#" class="card-link">
                Another link
              </a>
            </div>
          </div>
        ))} */}

        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="validatedCustomFile"
            onChange={handleUpload}
            required
          />
          <label className="custom-file-label" htmlFor="validatedCustomFile">
            {nameFile}
          </label>
          <div className="invalid-feedback">
            Example invalid custom file feedback
          </div>
          <button
            className="btn btn-outline-dark mt-3"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Profile;
