import logo from "../images/logo.png";
import lucas from "../images/Lucas.jfif";
import ailing from "../images/Ailging.jpg";
import camilo from "../images/Camilo.jpg";
import pumba from "../images/Pumba.jpg";
import niko from "../images/Niko.jpg";
import sergio from "../images/Sergio.jpg";
import thomas from "../images/Thomas.jpg";
import { NavLink } from "react-router-dom";

const About = () => {
  const theDevelopers = [
    {
      name: "Ailin Galante Rosso",
      image: ailing,
      github: "http://github.com/ailuwu12",
    },
    {
      name: "Franco David Segovia",
      image: pumba,
      github: "https://github.com/davidfranncoo",
    },
    {
      name: "Jeffer Camilo Romero Perez",
      image: camilo,
      github: "https://github.com/Camilop4",
    },
    {
      name: "Lucas Palma",
      image: lucas,
      github: "https://github.com/Lukkas98",
    },
    {
      name: "Nicolas Eduardo Juncos",
      image: niko,
      github: "https://github.com/juncos22",
    },
    {
      name: "Sergio Rodrigo Suárez",
      image: sergio,
      github: "https://github.com/serrsua",
    },
    {
      name: "Thomas Enrique Naquiche Leon",
      image: thomas,
      github: "https://github.com/nakiche",
    },
  ];

  return (
    <div className="DIV_ABOUT flex flex-col items-center bg-slate-500 h-full w-full lg:col-span-2">
      <div className="flex mb-4 sticky top-1 z-50">
        <NavLink to="/">
          <h2 className="text-lg font-bold py-2 px-3 bg-mediumGreen text-gray-800 mt-4 hover:text-white hover:bg-slate-900 rounded-md">
            Volver
          </h2>
        </NavLink>
      </div>
      <div className=" flex-col flex items-center bg-slate-500 h-full w-full lg:flex-row lg:justify-between lg:px-10">
        <div className="flex flex-col items-center font-semibold text-white shrink-0">
          <div className=" flex flex-col items-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="logo"
              className="bg-ligthGreen rounded-full w-24 h-24 p-2 animate-spin-slow"
            />
            <h2 className="text-lg font-bold mt-4">¿Qué es ProgramaRed?</h2>
          </div>
          <div className=" max-w-sm">
            <p className=" m-7 text-center">
              ProgramaRed es una red social creada específicamente para
              programadores y desarrolladores
            </p>
            <p className=" m-7 text-center">
              En la plataforma podrás encontrar a otros programadores con
              intereses similares a los tuyos, colaborar en proyectos, compartir
              tus conocimientos y aprender de otros colegas
            </p>
            <p className=" m-7 text-center">
              Tendrás tu Perfil, en donde podrás crear tus propios posteos con
              imágenes. Una vista Home en donde verás los posts de los
              programadores a los que sigues, ahí encontrarás un filtro para
              buscar usuarios o posteos de los temas que te interesen. También
              encontrarás una sección para acceder a tu membresía premium, lo
              que te permitirá compartir contenido como videos u otro tipo de
              archivos
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center font-semibold max-w-xl text-white border-t border-green-500">
          {theDevelopers.map((dev, i) => {
            return (
              <div
                key={i}
                className=" py-5 w-44 flex flex-col items-center justify-center"
              >
                <img className=" rounded-full w-20 " src={dev.image} alt="" />
                <p className=" text-center">{dev.name}</p>
                <a
                  rel="noreferrer noopener"
                  className="hover:text-white hover:bg-slate-900 rounded-md p-1"
                  target="_blank"
                  href={dev.github}
                >
                  <svg
                    fill="#000000"
                    className="w-8 h-8"
                    viewBox="0 0 32.00 32.00"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                    strokeWidth="0.00032"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#1ca638"
                      strokeWidth="2.496"
                    >
                      {" "}
                      <title>github</title>{" "}
                      <path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path>{" "}
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>github</title>{" "}
                      <path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path>{" "}
                    </g>
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
        <div className="flex items-center font-semibold text-white shrink-0 border-t border-green-500">
          <div className="flex-col max-w-sm items-center text-center">
            <h2 className="text-3xl font-bold mt-4">Desarrolladores</h2>
            <p className=" m-7 text-center">
              Somos un grupo de programadores juniors, jóvenes, de distintos
              países de Latinoamérica y estudiantes del bootcamp "Full Stack Web
              Developer" de SoyHenry
            </p>
            <p className=" m-7 text-center">
              ProgramaRed es nuestro proyecto final
            </p>
            <p className=" m-7 text-center">
              El objetivo del proyecto es acercar a los programadores
              latinoamericanos, generando una comunidad en la cual podamos
              interactuar de forma sencilla e intuitiva, razón por la cual
              decidimos encararlo a partir del concepto de "red social"
            </p>
            <p className=" m-7 text-center">
              Creemos que acercar a las personas y compartir el conocimiento es
              la mejor forma de aprender y eso nos ayuda a crecer de una forma
              más rápida en nuestra carrera profesional
            </p>
            <p className=" m-7 text-center">
              ¡Esperamos que nuestra web sea de tu agrado!
            </p>
            <p className=" m-7 text-center">
              Para contactarnos puedes enviarnos un e-mail a:
              programared2023@gmail.com o visitar nuestro{" "}
              <a
                rel="noreferrer noopener"
                target="_blank"
                className="bg-slate-900 p-0.5 rounded-md"
                href="http://github.com/programared2023"
              >
                GitHub
              </a>{" "}
              para ver el proyecto completo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
