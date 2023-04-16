export const validate = (data) => {
  const regexTitle = /^[a-zA-Z\d\s]+$/;

  const regexImg = /(png|jpe?g|svg)$/;
  const regexFiles = /(png|jpe?g|gif|svg|mp4|)$/;

  let errors = {};

  if (!data.title) errors.title = "Debes ingresar un título";
  else if (data.title.length > 50) errors.title = "Título demasiado largo";
  else if (!regexTitle.test(data.title))
    errors.name = "Sólo puedes usar letras y números";

  if (data.actualTag.length > 12) errors.actualTag = "Tag demasiado largo";

  if (!data.tags.length) errors.tags = "Debes ingresar al menos un tag";

  if (!data.description) errors.description = "Debes ingresar una descripción";
  if (data.description.length > 500)
    errors.description = "Descripción demasiado larga";

  if (data.files.length) {
    if (data.isPremium) {
      for (let i = 0; i < data.files.length; i++) {
        if (!regexFiles.test(data.files[i].type))
          errors.files = "Sólo se admiten archivos: png, jpg, jpeg, gif, svg y mp4";
      }
    } else {
      for (let i = 0; i < data.files.length; i++) {
        if (!regexImg.test(data.files[i].type))
          errors.files = "Sólo puedes subir imagenes png, jpg, jpeg, o svg";
      }
    }
  }

  return errors;
};