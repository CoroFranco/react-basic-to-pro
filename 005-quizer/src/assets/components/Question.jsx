import { useState } from "react"

export default function Question ({onClick, question}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  return (
      <div>
      <p>{question.text}</p>
      {
        question.options.map((option,id) => (
          <div key={option}>
            <input id={id} type="checkbox" 
            checked={selectedAnswer===id }
            onChange={() => setSelectedAnswer(id)}
            />
            <label htmlFor={id}>{option}</label>
          </div>
        ))
      }
    <button onClick={() => onClick(selectedAnswer)}>Enviar</button>
    </div>
  )
}
