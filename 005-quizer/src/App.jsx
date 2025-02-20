import { useReducer } from "react";
import "./App.css";

const initialState = {
  questions: [
    {
      id: 1,
      text: "¿Cuál es la capital de Japón?",
      options: ["Pekín", "Seúl", "Tokio", "Bangkok"],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: "¿Quién creó el manga 'One Piece'?",
      options: ["Masashi Kishimoto", "Eiichiro Oda", "Akira Toriyama", "Naoko Takeuchi"],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: "¿En qué año se estrenó el anime 'Neon Genesis Evangelion'?",
      options: ["1995", "2000", "1990", "2005"],
      correctAnswer: 0,
    },
  ],
  currentQuestionIndex: 0,
  score: 0,
  quizStarted: false,
  quizFinished: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "NEXT":
      if(state.currentQuestionIndex === 3) return {...state}
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  console.log(state)
  return (
    <>
      <button onClick={() => dispatch({ type: "NEXT" })}>Actualizar ID</button>
      <div>ID de la primera pregunta: {state.questions[0].id}</div>
    </>
  );
}

export default App;
