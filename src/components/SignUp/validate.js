const validate = (form) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexUsername = /^[a-zA-Z0-9.-]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?:\-<>\/~`]{8,}$/
    let errors = {};
    if(!form.username) errors.username = "Ingrese un nombre de usuario";
    if(!form.email) errors.email = "Ingrese su email"
    if(!form.password) errors.password = "Ingrese su contraseña"
    if(!regexEmail.test(form.email)) errors.email = "Ingrese un email válido"
    if(!regexUsername.test(form.username)) errors.username = "Tu nombre de usuario solo puede incluir letras, números, guiones y puntos";
    if(form.username.length < 3 || form.username.length > 15) errors.username = "Tu nombre de usuario debe tener entre 3 y 15 caracteres";
    if(!regexPassword.test(form.password)) errors.password = "Tu contraseña debe incluír al menos una mayúscula y al menos un número";
    if(form.password.length < 6) errors.password = "Tu contraseña debe contener al menos 6 caracteres"

    return errors;
};

export default validate;