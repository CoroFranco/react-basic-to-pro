import Input from "./Input";

export default function Form () {

  return (
    <form >
     <Input name='username'>Nombre de usuario: </Input>
     <Input name='email'>Email: </Input>
     <Input name='password'>Password: : </Input>
      <button type="submit" >
          registrar
      </button>
    </form>
  )
}
