export const validate = (form) => {
  const regexUsername = /^[a-zA-Z0-9.-]+$/;
  let errors = {};
  if (!form.username) errors.user = "Debes ingresar un nombre de usuario";
  if (form.username.length < 3 || form.username.length > 15)
    errors.username = "Tu nombre de usuario debe tener entre 3 y 15 caracteres";
  if (!regexUsername.test(form.username))
    errors.username =
      "Tu nombre de usuario solo puede incluir letras, números, guiones y puntos";

  if (!form.password) errors.password = "Debes ingresar una contraseña";
  if (form.password.length < 6)
    errors.password = "Tu contraseña debe contener al menos 6 caracteres";

  return errors;
};
