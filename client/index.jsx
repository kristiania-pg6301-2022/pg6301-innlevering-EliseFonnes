import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QuizGame } from "./quizGame";

ReactDOM.render(
  <BrowserRouter>
    <QuizGame />
  </BrowserRouter>,
  document.getElementById("app")
);
