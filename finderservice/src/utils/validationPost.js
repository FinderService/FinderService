


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


