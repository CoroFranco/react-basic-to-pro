import Form from './components/Form'
import { FormContext } from './context/formContext'
import './App.css'



function App() {

  return (
    <FormContext>
       <Form />
    </FormContext>
  )
}

export default App
