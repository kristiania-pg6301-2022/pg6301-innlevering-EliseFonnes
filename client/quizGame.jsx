import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { isCorrectAnswer, randomQuestion } from "./../server/questions.js";

export const QuestionContext = React.createContext({ randomQuestion });

async function postJSON(url, json) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  return res.json();
}
const quizApi = {
  postAnswer: async ({ id, answer }) => {
    return postJSON("/api/question", { id, answer });
  },
};

export function FrontPage({ correctAnswers, questionsAnswered }) {
  return (
    <div>
      <h1>Kristiania Quiz</h1>
      <div data-testid={"status"}>
        You have answered {correctAnswers} of {questionsAnswered} correctly
      </div>
      <Link to={"/questions"}>
        <button>Take new quiz</button>
      </Link>
    </div>
  );
}

export function ShowQuestion({ setCorrectAnswers, setQuestionsAnswered }) {
  const navigate = useNavigate();
  let id = "";

  const [answer, setAnswer] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const data = await quizApi.postAnswer({ id, answer });
    if (data.result === true) {
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  }

  //const { randomQuestion } = useContext(QuestionContext);
  const [question, setQuestion] = useState("");
  console.log(id + "ping");

  useEffect(async () => {
    const res = await fetch("/quiz/random");
    setQuestion(await res.json());

    console.log(id + "pong");
  }, []);

  let test = "";

  if (question) {
    id = question.id;
  }
  if (question) {
    test = (
      <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
          .filter((a) => question.answers[a])
          .map((a) => (
            <div key={a}>
              <form onSubmit={handleSubmit}>
                <button
                  name={"answer"}
                  value={question.answers[a]}
                  onClick={() => setAnswer(a)}
                >
                  {question.answers[a]}
                </button>
              </form>
            </div>
          ))}
      </div>
    );
  }

  return <div>{test}</div>;
}

function ShowAnswer() {
  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>
      <div>
        <Link to={"/"}>Show score</Link>
      </div>
      <div>
        <Link to={"/questions"}>New question</Link>
      </div>
    </div>
  );
}

export function QuizGame() {
  const [questionAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            questionsAnswered={questionAnswered}
            correctAnswers={correctAnswers}
          />
        }
      />
      <Route
        path={"/questions"}
        element={
          <ShowQuestion
            setQuestionsAnswered={setQuestionsAnswered}
            setCorrectAnswers={setCorrectAnswers}
          />
        }
      />
      <Route path={"/answer/*"} element={<ShowAnswer />} />
    </Routes>
  );
}
