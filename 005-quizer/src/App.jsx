import { useReducer } from "react";
import "./App.css";
import Question from "./assets/components/Question";

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
    case "QUIZ_START":
      return {...state, quizStarted: true}
    case "ANSWER_QUESTION":
      const currentQuestion = state.questions[state.currentQuestionIndex]
      const isCorrect = action.payload === currentQuestion.correctAnswer
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score
      }
      case "NEXT_QUESTION":
        const nextQuestion = state.currentQuestionIndex + 1
        return {...state, currentQuestionIndex: nextQuestion, quizFinished: nextQuestion >= 3}
      
        
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const handleClick = (selectedAnswer) => {
    dispatch({type: "ANSWER_QUESTION", payload: selectedAnswer})
    dispatch({type: 'NEXT_QUESTION'})
  }
  console.log(state)
  return (
    <>
      {
        !state.quizStarted && 
          <button onClick={() => dispatch({type: "QUIZ_START"})}>
            iniciar
          </button>
}
{
        state.questions.map((question, id) => {
          if(id === state.currentQuestionIndex && state.quizStarted){
            return(
              <Question key={id} question={question} onClick={handleClick} />

            )
          }
        })
      }
      {
                state.quizFinished && 
                <button onClick={() => dispatch({type: "QUIZ_START"})}>
                  {state.score}
                </button>
      }
    </>
  );
}

export default App;
