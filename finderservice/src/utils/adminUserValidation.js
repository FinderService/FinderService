const adminValidation = (formData) =>{
    let errors = { flag: true };

    if(!formData.name){
        errors.name = "Este campo NO debe estar vacío.";
        errors.flag = false;
    }else if(!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(formData.name)){
        errors.name = "Este campo debe contener sólo letras.";
        errors.flag = false;
    }else if(formData.name.length < 3 || formData.name.length > 20){
        errors.name = "Este campo debe contener entre 3 y 20.";
        errors.flag = false;
    }

    if(!formData.email){
        errors.email = "Este campo NO debe estar vacío.";
        errors.flag = false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
        errors.email = "Este campo debe contener un formato de E-mail.";
        errors.flag = false;
    }

    if(!formData.phone){
        errors.phone = "Este campo NO debe estar vacío.";
        errors.flag = false;
    }else if(!/^\d+$/.test(formData.phone)){
        errors.phone = "Este campo debe contener sólo números.";
        errors.flag = false;
    }else if(formData.phone.length > 10){
        errors.phone = "Este campo no debe tener más de 10 caracteres.";
        errors.flag = false;
    }

    return errors;
}

export default adminValidation;