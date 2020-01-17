import React, { useState } from "react";
import "../css/login/index.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "../redux/actions/authenticated";

const LogIn = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated)
    .authenticated;
  console.log(isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [alertData, setAlertData] = useState({
    isShow: false,
    message: "",
    className: ""
  });
  const handleAuthentication = e => {
    e.preventDefault();
    let userAuthenticate = {
      email,
      password
    };

    fetch("http://localhost:5000/users/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userAuthenticate)
    }).then(async res => {
      const response = await res.json();
      console.log(res);
      if (response.success) {
        localStorage.setItem("BiologyPen", response.authToken);
        setAlertData({
          isShow: true,
          message: response.message,
          className: "success"
        });
        console.log(response);
        setIsRedirect(true);
        dispatch(
          setIsAuthenticated(
            true,
            response.fullName,
            response.username,
            response._id
          )
        );
      } else {
        setAlertData({
          isShow: true,
          message: response.message,
          className: "danger"
        });
      }
    });
  };
  const renderRedirect = () => {
    if (isRedirect) {
      return <Redirect to="/" />;
    }
  };
  if (isAuthenticated) return <h1>Already logged-in, wanna go back?</h1>;
  return (
    <React.Fragment>
      {renderRedirect()}
      {alertData.isShow === true ? (
        <Alert
          variant={alertData.className}
          onClose={() => setAlertData({ isShow: false })}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{alertData.message}</p>
        </Alert>
      ) : null}
      <Form onSubmit={handleAuthentication}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="John@email.domain"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Usually it's the email address you used for signing up!
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
          <Form.Text className="text-muted">
            Never tell anybody your password!
          </Form.Text>
        </Form.Group>
        <Button variant="outline-dark" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default LogIn;
