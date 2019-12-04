import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateQuiz = () => {
  let question;
  let answer;
  fetch("/api/getList")
    .then(res => res.json())
    .then(list => console.log(list));
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        let questionsUser = {
          questions: []
        };
        if (!question.value.trim()) {
          return;
        }
        questionsUser.questions[question] = [
          {
            answer,
            correct: true,
            numberAnswer: 0
          }
        ];
        console.log(questionsUser);

        question.value = "";
        answer.value = "";
      }}
    >
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" placeholder="John Hardman" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>First Question</Form.Label>
        <Form.Control
          type="text"
          placeholder="What's bio?"
          ref={node => (question = node)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text" ref={node => (answer = node)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateQuiz;
