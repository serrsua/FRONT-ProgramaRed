const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Validate(inputs) {
  var errors = {};

  //email validation
  if (!inputs.email) errors.email = "Ingresa tu email";
  if (!regexEmail.test(inputs.email)) errors.email = "Ingresa un email válido";

  return errors;
}
