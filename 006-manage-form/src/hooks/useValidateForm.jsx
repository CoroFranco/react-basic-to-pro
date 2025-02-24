import { useState } from "react"
import { validate } from "../services/validate"

export default function useValidateForm () {
  const [values, setValues] = useState({username: '', email: '', password: ''})
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {value, name} = e.target
    setValues(prevValues => ({...prevValues, [name]: value }) )
    console.log(values)
  }

  const handleBlur = (e) => {
    const {name} = e.target
    const newErrors = validate(values)
    setErrors(prevErrors => ({...prevErrors, [name]: newErrors[name]}))
    console.log(errors)
  }

  return {values, handleChange, handleBlur, errors}
}
