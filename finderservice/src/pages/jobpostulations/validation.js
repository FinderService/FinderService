

export function validateName (name){

  if(name === ''){
      return '* El nombre del empleo es obligatorio';
  }

  if(name.length > 25){
      return '* Es muy largo';
  }

  if(name.length < 3){
      return '* Debe tener almenos 3 letras';
  }
  
  return '';
}

export function validateMessage (message){

  if(message === ''){
      return '* La descripción del empleo es obligatoria';
  }

  if(message.length > 70){
      return '* La descripción es muy extensa';
  }

  if(message.length < 10){
      return '* La descripción es muy breve';
  }
  
  return '';
}


export function validateSalary (salary){

  if(salary === ''){
      return '* El costo aproximado es obligatorio';
  }

  
  return '';
}


export function validateState (state){

  if(state === ''){
      return '* Debe indicar su estado de disponibilidad';
  }

  if(state.length > 15){
      return '* Es muy extenso';
  }
  
  return '';
}


export function validatePhone (phone){

  if(phone === ''){
      return '* El campo es requerido.';
  }

  if(phone.length > 13){
      return '* Es muy largo';
  }

  if(phone.length < 10){
      return '* Debe ser tener al menos 10 digitos';
  }

  if(!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone)){
      return 'El formato no es valido.';
  }
  
  return '';
}
