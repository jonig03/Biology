import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../css/login/index.css";
import { useSelector } from "react-redux";

const SignUp = () => {
  const isAuthenticated = useSelector(state => state).isAuthenticated;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const errorTitle = "Oh snap! You got an error!";
  const [alertData, setAlertData] = useState({
    isShow: false,
    message: "",
    title: "",
    className: ""
  });
  const handleAddUser = e => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      username,
      email,
      password
    };

    if (password.length < 3) {
      setAlertData({
        message: "Password has be longer than 3 characters"
      });
      setAlertData({ isShow: true });
      return false;
    }

    fetch("http://localhost:5000/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(async res => {
      console.log(await res);
      const data = await res.json();
      if (!data.success) {
        console.log(data);
        if (data.err) {
          if (data.err.errmsg.includes("username_1 dup key")) {
            setAlertData({
              message:
                "An existing user has that username! a username should be unique.",
              isShow: true,
              className: "danger",
              title: errorTitle
            });
          } else if (data.err.errmsg.includes("email_1 dup key")) {
            setAlertData({
              message:
                "An existing user has that email! a email should be unique.",
              isShow: true,
              className: "danger",
              title: errorTitle
            });
          }
        } else {
          if (data.message === "Username has spaces.") {
            setAlertData({
              message: data.message,
              isShow: true,
              className: "danger",
              title: errorTitle
            });
          }
        }
      } else {
        setAlertData({
          message: "Congratulations! Your account has been added!",
          isShow: true,
          className: "success",
          title: "You are one of us now!"
        });
      }
    });
  };
  if (isAuthenticated.authenticated)
    return <h1>Already logged-in, wanna go back?</h1>;
  return (
    <React.Fragment>
      {alertData.isShow === true ? (
        <Alert
          variant={alertData.className}
          onClose={() => setAlertData({ isShow: false })}
          dismissible
        >
          <Alert.Heading>{alertData.title}</Alert.Heading>
          <p>{alertData.message}</p>
        </Alert>
      ) : null}

      <Form onSubmit={handleAddUser}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="JohnTheMAN"
            value={username}
            onChange={evt => setUsername(evt.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Your username is how people would recognize you, it's supposed to be
            unique.
          </Form.Text>
          <Form.Text className="text-muted">
            <u>Make sure your username doesn't have spaces.</u>
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            value={firstName}
            onChange={evt => setFirstName(evt.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Berkovich"
            value={lastName}
            onChange={evt => setLastName(evt.target.value)}
            required
          />
          <Form.Text className="text-muted">
            displaying your full name would be optional in user profile
            settings.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
            required
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default SignUp;
