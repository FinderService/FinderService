

export function validateDescription (descripción){

  if(descripción === ''){
      return '* La descripción del empleo es obligatoria';
  }

  if(descripción.length > 150){
      return '* La descripción es muy extensa';
  }

  if(descripción.length < 10){
      return '* La descripción es muy breve';
  }
  
  return '';
}


export function validateAddress (address){

  if(address === ''){
      return '* La ubicación aproximada es obligatoria';
  }

  
  return '';
}


export function validateDate (date){

  if(date === ''){
      return '* Debe indicar una fecha';
  }

  if(!/^[0-9\-/]*$/.test(date)){
      return '* Es muy largo';
  }
  
  return '';
}


export function validatePhoto (photo){

  if(photo || !photo ){
      return '* La imagen es opcional.';
  }

  
  return '';
}
