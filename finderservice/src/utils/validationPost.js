


export function validateMessage (message){

  if(message === ''){
      return '* La descripción del empleo es obligatoria';
  }

  if(message.length > 150){
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





