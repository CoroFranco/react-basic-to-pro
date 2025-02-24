export const validate = (values) => {
  let errors = {}
  if(values.username === ''){
    errors.username = 'El nombre de usuario es obligatorio'
  }

  if(!values.email){
    errors.email = 'El email es obligatorio'
  }else if (!/\S+@\S+\.\S+/.test(values.email)){
    errors.email = 'Correo electronico invalido'
  }

  if(!values.password){
    errors.password = 'La clave es obligatoria'
  }else if(values.password.length < 6) {
    errors.password = 'La clave debe tener al menos 6 caracteres'
  }
  return errors
}
