import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearUser, getUserById } from "../../redux/actions";
import Post from "../../components/Post";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadFile } from "../../firebase/config";
import person from "../../images/person.png";
import NotFound from "../../components/NotFound";
import Validate from './Validate.js';

const Profile = ({ toggleDetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.actualUser);

  const [formEmail, setFormEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [formDescription, setFormDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [profileImg, setProfileImg] = useState();
  const [formLinks, setFormLinks] = useState(false);
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
  });
  
  let userId = localStorage.getItem("id");

  useEffect(() => {
    let userId = localStorage.getItem("id");
    if (id === userId) {
      dispatch(getUserById(userId));
    }
    else {
      dispatch(getUserById(id));
    }

    return () => {
      dispatch(clearUser());
    };
  }, [id]);

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setEmail({
      ...email,
      [property]: value,
    });
    setErrors(Validate({ ...email, [property]: value }));
  };

  const updateEmail = async () => {
    let correo = email.email
    const { data } = await axios.put(`/user/${userId}`, { email:correo });
    Swal.fire({
      icon: "success",
      title: "Email actualizado",
      text: data,
    }).then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  };

  const updateLinks = async () => {
    if (links.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Escribe un link",
        showConfirmButton: true,
      });
    } else {
      const { data } = await axios.put(`/user/${userId}`, {
        socialLinks: links,
      });

      Swal.fire({
        icon: "success",
        title: "Link actualizado",
        text: data,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) window.location.reload();
      });
    }
  };
  const deleteLink = async () => {
    const { data } = await axios.put(`/user/${userId}`, {
      socialLinks: [],
    });
    Swal.fire({
      icon: "success",
      title: "Link eliminado",
      text: data,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  };

  // console.log("user: ", user);

  console.log("LINKS: ", links);

  const updateDescription = async () => {
    const { data } = await axios.put(`/user/${userId}`, { description });
    Swal.fire({
      icon: "success",
      title: "Descripción actualizada",
      text: data,
    }).then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  };

  const inputFile = async (e) => {
    const file = await e.target.files;
    setProfileImg(file);
  };

  const fileDelete = () => {
    setProfileImg();
  };

  const uploadProfileImg = async () => {
    const url = await uploadFile(profileImg[0], "userImg/");

    if (url !== undefined) {
      try {
        const { data } = await axios.put(`user/${id}`, { profileImage: url });

        Swal.fire({
          icon: "success",
          title: "Imagen subida",
          text: data,
        }).then((result) => {
          if (result.isConfirmed) window.location.reload();
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al subir tu imagen",
        });
      }
    }
  };

  return (
    <>
      {user.username ? (
        <div className="DIV_PROFILE flex flex-col w-full relative">
          <div className="grid gap-3 justify-items-center justify-center w-full max-w-5xl mx-auto px-4 py-8 items-center md:grid-rows-1 md:grid-cols-2">
            <div className="grid w-[90%] lg:w-[60%] justify-center justify-items-center relative mb-5 md:m-0">
              {id !== localStorage.getItem("id") ? (
                !user.profileImage ? (
                  <>
                    <img
                      src={person}
                      alt="ProfilePhoto"
                      className="rounded-full w-full object-cover object-center border-2 border-green-500"
                    />
                  </>
                ) : (
                  <>
                    <img
                      referrerPolicy="no-referrer"
                      src={user.profileImage}
                      alt="ProfilePhoto"
                      className="rounded-full h-full object-cover object-center border-2 border-green-500"
                    />
                  </>
                )
              ) : (
                <>
                  <img
                    src={user.profileImage ? user.profileImage : person}
                    alt="ProfilePhoto"
                    className="rounded-full w-full object-cover object-center border-2 border-green-500"
                  />
                  <div className="p-2 absolute bottom-[-20px] self-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110">
                    <label htmlFor="profile">
                      <input
                        onChange={inputFile}
                        className="hidden"
                        type="file"
                        accept="image/*"
                        name="profile"
                        id="profile"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                    </label>
                  </div>
                  {profileImg ? (
                    <div className="flex flex-col">
                      <span
                        onClick={fileDelete}
                        className="cursor-pointer bg-red-400 px-2 py-1 self-center"
                      >
                        X
                      </span>
                      <img
                        className=" rounded-full"
                        src={URL.createObjectURL(profileImg[0])}
                        alt=""
                      />
                      <button
                        onClick={uploadProfileImg}
                        className=" p-2 m-4 self-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110"
                      >
                        Subir
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>

            <div className="w-full">
              <div className="grid space-y-4 justify-items-center">
                <h1 className="text-center text-3xl font-bold">
                  {user.username}
                </h1>
                <div className="text-center text-lg text-black-700 font-medium">
                  {!user.email &&
                   !formEmail  ?
                   (
                    <div className="flex items-center relative w-full h-full p-3 text-lg border font-medium border-none">
                    <p className="text-rose-600">Agrega tu correo</p>
                    <button
                      className="absolute top-[-5px] right-[-38px] p-2 font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110 "
                      onClick={() => {
                        setFormEmail(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                  ) : <span>{user.email}</span>
                }

                {formEmail && (
                  <form onSubmit={(e)=>{
                    e.preventDefault();
                    updateEmail()}}>
                    <div className=" flex flex-col">
                      <input
                        onChange={handleInputChange}
                        name="email"
                        size="24"
                        placeholder="micorreo@correo.com"
                      ></input>
                      <p style={{fontSize: '15px',color: 'red'}}>{errors.email}</p>
                      <button  disabled ={email.length!==0 && !errors.email ? false :true} className=" p-2 m-4 self-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110">
                        Actualizar correo
                      </button>
                    </div>
                  </form>
                )}

                </div>
                {!user.description &&
                !formDescription &&
                id === localStorage.getItem("id") ? (
                  <button
                    className="p-2 m-4 self-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-130 "
                    onClick={() => {
                      setFormDescription(true);
                    }}
                  >
                    Agrega una descripción
                  </button>
                ) : id !== localStorage.getItem("id") ? (
                  <div className="flex items-center w-full h-full p-3 text-lg border font-medium border-blue-700">
                    <span>{user.description}</span>
                  </div>
                ) : (
                  <div className="flex items-center relative w-full h-full p-3 text-lg border font-medium border-blue-700">
                    <span>{user.description}</span>

                    <button
                      className="absolute top-[-40px] right-0 p-2 font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110 "
                      onClick={() => {
                        setFormDescription(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {formDescription && (
                  <form onSubmit={updateDescription}>
                    <div className=" flex flex-col">
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        name="description"
                        cols="35"
                        rows="5"
                        className=" resize-none"
                      ></textarea>
                      <button className=" p-2 m-4 self-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-110">
                        Actualizar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* LINKS */}

              <div className=" mt-7">
                {id !== localStorage.getItem("id") ? ( // es otro perfil
                  user.socialLinks?.length ? ( // y tiene links
                    <>
                      {user.socialLinks?.map((link, i) => {
                        return (
                          <div>
                            <a key={i} target="_blank" href={link}>
                              {link}
                            </a>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )
                ) : user.socialLinks?.length ? ( // tiene el mismo id y tiene links
                  <>
                    <button onClick={() => setFormLinks(true)}>Cambiar</button>
                    {formLinks && (
                      <form>
                        <div>
                          <label>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </label>
                          <input
                            onChange={(e) => {
                              const url = [];
                              url.push(e.target.value);
                              setLinks([url]);
                            }}
                            value={links}
                            type="url"
                            name="url"
                            id="url"
                          />
                        </div>
                        <span
                          className=" cursor-pointer"
                          onClick={() => updateLinks()}
                        >
                          Subir link
                        </span>
                      </form>
                    )}
                    {user.socialLinks?.map((link, i) => {
                      return (
                        <div key={i}>
                          <span
                            className=" cursor-pointer"
                            onClick={() => deleteLink()}
                          >
                            X
                          </span>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </a>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  // mismo id pero no tiene links
                  <>
                    <button type="button" onClick={() => setFormLinks(true)}>
                      Agrega una url
                    </button>
                    {formLinks && (
                      <form onSubmit={updateLinks}>
                        <div>
                          <label>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                              />
                            </svg>
                          </label>
                          <input
                            onChange={(e) => {
                              const urls = [];
                              urls.push(e.target.value);
                              setLinks([urls]);
                            }}
                            value={links}
                            type="url"
                            name="url"
                            id="url"
                          />
                        </div>
                        <button type="submit">Subir url</button>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {id === localStorage.getItem("id") ? (
            <NavLink
              to="/createPost"
              className="p-2 mx-auto sticky top-3 text-center font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-130"
            >
              Sube un posteo
            </NavLink>
          ) : (
            ""
          )}
          <div className="DIV_POST_PROFILE p-9 overflow-hidden h-full">
            {user ? (
              <>
                <h2 className="text-2xl font-bold">
                  {user.Posts?.length
                    ? "Publicaciones"
                    : "No hay publicaciones"}
                </h2>
                <div className="flex flex-col gap-2 py-5 overflow-y-auto scrollbar-thin scrollbar-track-transparent">
                  {user.Posts?.map((post, i) => {
                    return (
                      <Post
                        post={post}
                        user={user}
                        key={i}
                        toggleDetails={toggleDetails}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="DIV_PROFILE flex flex-col w-full relative">
          <p>Perfil? no hay Perfil!</p>
          <NotFound />
        </div>
      )}
    </>
  );
};

export default Profile;
