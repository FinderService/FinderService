const adminJobValidation = (formData) =>{
    let errors = { flag: true };

    if(!formData.title){
        errors.title = 'Este campo no debe estar vacío.';
        errors.flag = false;
    }else if(formData.title.length > 30 || formData.title.length < 3 ){
        errors.title = 'Debe contener entre 3 & 30 caracteres.';
        errors.flag = false;
    }

    return errors;
}

export default adminJobValidation;