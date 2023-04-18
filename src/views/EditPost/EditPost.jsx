import { useEffect, useState } from "react";
import { validate } from "./createPostValidation";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { uploadFile } from "../../firebase/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const EditPost = () => {
  const actualUser = useSelector((state) => state.actualUser);
  const editedPost = useSelector(state => state.editedPost)
  console.log("post", editedPost)
  const tagNames = editedPost.Tags.map(tag => tag.name)
  const filesURL = editedPost.files

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user] = useState(actualUser);
  let id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id, user]);

  console.log("USER desp del useEffect: ", user);

  const [form, setForm] = useState({
    title: editedPost.title,
    tags: tagNames,
    actualTag: "",
    description: editedPost.description,
    userId: id,
    files: []
  });

  console.log("form", form)

  const [errors, setErrors] = useState({
    title: "",
    tags: [],
    actualTag: "",
    description: "",
  });

  const [tag, setTag] = useState("");

  useEffect(() => {
  }, [form, id]);

  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const addTag = () => {
    if (tag === "") return "";
    if (!form.tags.includes(tag)) {
      setForm({
        ...form,
        tags: [...form.tags, tag],
      });
    }
    setTag("");
  };

  const handeTagDelete = (tag) => {
    setForm({
      ...form,
      tags: form.tags.filter((t) => t !== tag),
    });
  };

  const clearForm = () => {
    setForm({
      title: "",
      tags: [],
      actualTag: "",
      description: "",
      userId: user.id,
      files: [],
    });
    setTag("");
  };

  const inputFile = async (e) => {
    const files = await e.target.files;

    setForm({
      ...form,
      files: [...form.files, ...files],
    });
  };

  const fileDelete = (file) => {
    setForm({
      ...form,
      files: form.files.filter((f) => f !== file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let urls = editedPost.files

    for (const key of form.files) {
      const url = await uploadFile(key, "post/");
      urls.push(url);
    }

      try {
        const { data } = await axios.put(`/post/${editedPost.id}`, { title: form.title, tags: form.tags, description: form.description, userId: form.userId});

        Swal.fire({
          icon: "success",
          title: "Post Editado",
          text: data,
        }).then((result) => {
          if (result.isConfirmed) navigate(`/profile/${id}`);
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al editar el post",
        });
      }
    
    clearForm();
  };

  return (
    <div className="DIV_CREATEPOST block my-8 px-4 w-full">
      <div className="max-w-[600px] mx-auto p-6 bg-white rounded-md shadow-md w-full">
        <h2 className="text-xl font-bold text-green-700 mb-6">
          Edita tu post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título
            </label>
            <input
              onChange={handleInputs}
              type="text"
              name="title"
              placeholder="Agrega un título..."
              value={form.title}
              className={`border-gray-300 block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                errors.title
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
              `}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <div className=" flex gap-1">
              <input
                id="inputTag"
                type="text"
                name="tags"
                placeholder="ejemplo: Javascript y/o React"
                onChange={(e) => {
                  setTag(e.target.value);
                  setForm({
                    ...form,
                    actualTag: e.target.value,
                  });
                  setErrors(
                    validate({
                      ...form,
                      actualTag: e.target.value,
                    })
                  );
                }}
                value={tag}
                className={`border-gray-300 block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out 
                ${
                  errors.tags?.length || errors.actualTag
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:ring-green-500 focus:border-green-500"
                }`}
              />
              <button
                type="button"
                disabled={!!errors.actualTag}
                onClick={addTag}
                className={`text-white font-semibold py-1 px-2 rounded
                  ${
                    form.tags.length > 0 && errors.actualTag
                      ? "bg-red-500 hover:bg-red-500"
                      : ""
                  }
                  ${
                    form.tags.length === 0 && errors.actualTag
                      ? "bg-red-500 hover:bg-red-500"
                      : ""
                  }
                  ${
                    form.tags.length > 0 && !errors.actualTag
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }
                  ${
                    form.tags.length === 0 && !errors.actualTag
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
              >
                Agregar
              </button>
            </div>
            {errors.tags && errors.actualTag && (
              <span className="text-red-500 text-sm">{errors.actualTag}</span>
            )}
            {!errors.tags && errors.actualTag && (
              <span className="text-red-500 text-sm">{errors.actualTag}</span>
            )}
            {errors.tags && !errors.actualTag && (
              <span className="text-red-500 text-sm">{errors.tags}</span>
            )}
          </div>

          <div className="flex gap-3 w-full flex-wrap">
            {form.tags.map((tag, i) => (
              <div
                className="bg-green-500 px-2 py-1 rounded-md flex items-center justify-between font-medium"
                key={i}
              >
                <span className="mr-2">{tag}</span>
                <span
                  className="cursor-pointer text-red-800 hover:bg-green-600 px-1 rounded"
                  onClick={() => handeTagDelete(tag)}
                >
                  X
                </span>
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <textarea
              onChange={handleInputs}
              name="description"
              cols="30"
              rows="10"
              placeholder="Agrega una descripción a tu posteo..."
              value={form.description}
              className={`border-gray-300 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                errors.description
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
              `}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`${"bg-green-500 hover:bg-green-600"
              } text-white font-bold py-2 px-4 rounded`}
            >
              Editar
            </button>
            <button
              className=" text-gray-100 font-bold py-2 px-4 rounded bg-stone-500 hover:bg-stone-400 hover:text-gray-800"
              type="button"
              onClick={clearForm}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
