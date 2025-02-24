import Form from './components/Form'
import './App.css'
import { FormContext } from './context/formContext'



function App() {

  return (
    <FormContext>
       <Form />
    </FormContext>
  )
}

export default App
