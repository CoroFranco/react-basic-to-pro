import {createContext } from "react"
import useValidateForm from "../hooks/useValidateForm";

export const FormContext = createContext();


export function FormProvider ({children}) {
  const {values, errors, handleChange, handleBlur} = useValidateForm()
  return (
    <FormContext value={{values, errors, handleChange, handleBlur}}>
      {children}
    </FormContext>
  )
}

