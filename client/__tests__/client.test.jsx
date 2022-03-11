import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import {
  FrontPage,
  QuestionContext,
  QuizGame,
  ShowQuestion,
} from "../quizGame";
import pretty from "pretty";

const question = {
  question: "Are you happy?",
  answers: {
    answer_a: "Yes",
    answer_b: "No",
    answer_c: "Maybe",
  },
  correct_answers: {
    answer_a_correct: "true",
    answer_b_correct: "false",
    answer_c_correct: "false",
  },
};

describe("Quiz game", () => {
  it("Shows answer status", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage correctAnswers={3} questionsAnswered={10} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "You have answered 3 of 10 correctly"
    );
    expect(pretty(element.innerHTML)).toMatchSnapshot();
  });

  it("shows question", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider value={{ randomQuestion: () => question }}>
          <QuizGame />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );
    expect(pretty(element.innerHTML)).toMatchSnapshot();
  });

  it("records correct answer", () => {
    const setQuestionsAnswered = jest.fn();
    const setCorrectAnswers = jest.fn();

    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/question"]}>
        <QuestionContext.Provider value={{ randomQuestion: () => question }}>
          <ShowQuestion
            setCorrectAnswers={setCorrectAnswers}
            setQuestionsAnswered={setQuestionsAnswered}
          />
        </QuestionContext.Provider>
      </MemoryRouter>,
      element
    );

    Simulate.click(element.querySelector("[data-testid=answer_a] button"));
    expect(setQuestionsAnswered).toBeCalled();
    expect(setCorrectAnswers).toBeCalled();
    expect(pretty(element.innerHTML)).toMatchSnapshot();
  });
});
