export function validateName (name){

    if(name === ''){
        return '* El campo es obligatorio';
    }

    if(name.length > 25){
        return '* Es muy largo';
    }

    if(name.length < 3){
        return '* Debe tener almenos 3 letras';
    }
    
    return '';
}

export function validateUsername (username){

    if(username === ''){
        return '* El email es obligatorio';
    }

    if(username.length > 35){
        return '* El email debe tener menos de 35 caracteres';
    }

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(username)){
        return '* Username must be a valid email address';
    }
    return '';
}

export function validatePassword(password){

    if(password.length < 6 || password.length > 10){
        return '* La contraseña debe tener entre 6 y 10 caracteres';
    }

    if(!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/.test(password)){
        return '* La contraseña debe tener almenos una letra mayuscula, una letra minuscula y un numero';
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
        return '* Debe ser a 10 digitos';
    }

    if(!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone)){
        return 'El formato no es valido.';
    }
    
    return '';
}

export function validateAddress (address){
    if(address === ""){
        return "* Este campo es obligatorio"
    }


}

export function validateBirth (birth){

    var hoy = new Date();
    var cumpleanos = new Date(birth);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }


    if(birth === ''){
        return '* El campo es requerido.';
    }

    if(edad < 16){
        return '* Debes tener almenos 16 años cumplidos para registrarte';
    }
    
    return '';
}