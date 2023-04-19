import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";
import { getUserById } from "./../redux/actions";

// const MP_PUBLIC_KEY = "TEST-5511f904-81cd-4d76-b9f5-72f286ec7543";
// initMercadoPago(MP_PUBLIC_KEY, {
//   locale: "es-AR",
// });

const FORM_ID = "payment-form";

const Payment = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.actualUser);
  let userId = localStorage.getItem("id");
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    dispatch(getUserById(userId));
    if (user.isPremium === false) {
      onSubmit();
    }
  }, []);

  // console.log(user);

  const onSubmit = async () => {
    try {
      setCargando(true);
      const paymentResult = await axios.post("/subcriptions", {
        title: "Subscripcion Premium",
        description:
          "Pagar una subscripcion premium para poder publicar videos",
        price: 500,
        user: {
          username: user.username,
          email: user.email,
        },
      });

      if (paymentResult.status === 200 && paymentResult.data.preferenceId) {
        setCargando(true);
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttribute("data-button-label", "Pagar con MercadoPago");
        script.setAttribute(
          "data-preference-id",
          paymentResult.data.preferenceId
        );
        const form = document.getElementById(FORM_ID);
        form.appendChild(script);
        setCargando(false);
      }
      setCargando(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error crear la preferencia",
        text: error.message,
        showConfirmButton: true,
      });
      setCargando(false);
    }
  };

  return (
    <div className="DIV_PREMIUM h-full w-full pt-10 row-span-3">
      <h2 className="text-center text-2xl font-bold mx-auto my-2">
        {user.isPremium === false ? (
          <>
            Aún no eres{" "}
            <a className="underline decoration-indigo-500/30">PREMIUM</a>😕
          </>
        ) : (
          <>
            Ya eres{" "}
            <a className="underline decoration-indigo-500/30">PREMIUM</a>😁
          </>
        )}
      </h2>
      <div
        id="wallet_container"
        className="w-3/4 bg-ligthGreen flex flex-col items-center gap-2 my-2 mx-auto p-5 rounded-40px"
      >
        {user.isPremium === false ? (
          <>
            <p>
              Hazte Premium para obtener beneficios adicionales en tu cuenta
            </p>
            <table className="table-auto border-separate border-slate-900 border-spacing-y-2 border-spacing-x-2">
              <thead>
                <tr>
                  <th className="">Funcionalidad</th>
                  <th className="">Plan gratuito</th>
                  <th className="">Plan Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className=" ">Conectar con otros programadores</td>
                  <td className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </td>
                  <td className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className=" ">Subir y descargar archivos</td>
                  <td className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                  <td className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      videos
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="">Publica videos</td>
                  <td className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                  <td className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>Al lado de tu nombre saldrá una insignia verificado</td>
                  <td className=" ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                  <td>
                    <svg
                      fill="none"
                      height="120"
                      viewBox="0 0 120 120"
                      width="120"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" w-8 h-8"
                    >
                      <path
                        d="m60 13.7 10.7 6.2h12.4l6.2 10.8 10.8 6.2v12.4l6.2 10.7-6.2 10.7v12.4l-10.8 6.2-6.2 10.8h-12.4l-10.7 6.2-10.7-6.2h-12.4l-6.2-10.8-10.8-6.2v-12.4l-6.2-10.7 6.2-10.7v-12.4l10.8-6.2 6.2-10.8h12.4z"
                        fill="#647eff"
                      />
                      <path
                        d="m60 93.9c-18.7 0-33.9-15.2-33.9-33.9s15.2-33.9 33.9-33.9 33.9 15.2 33.9 33.9-15.2 33.9-33.9 33.9zm0-64.9c-17.1 0-31 13.9-31 31s13.9 31 31 31 31-13.9 31-31-13.9-31-31-31z"
                        fill="#fff"
                      />
                      <path
                        d="m56.3 72.6-14.7-11.7c-1.2-1-1.4-2.7-.4-3.9s2.7-1.4 3.9-.4l12.6 10.1 16.8-18.8c1-1.1 2.8-1.2 3.9-.2s1.2 2.8.2 3.9l-18.5 20.7c-1 1.1-2.7 1.2-3.8.3z"
                        fill="#ffd77a"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
            <form id={FORM_ID} method="GET">
              {cargando && (
                <span className="text-2xl text-green-950">Cargando...</span>
              )}
            </form>
          </>
        ) : (
          <>
            <p>Ya cuentas con estos beneficios adicionales en tu cuenta</p>
            <ul className="list-disc">
              <li>
                Subir y descargar archivos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </li>
              <li>
                Publica videos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </li>
            </ul>
            <h2 className="text-center text-2xl font-bold mx-auto my-2">
              Si deseas realizar otro pago no nos molestamos🤑
            </h2>
          </>
        )}

        {/* <Wallet
          customization={{
            visual: { buttonBackground: "default", borderRadius: "8rem" },
          }}
          initialization={{ redirectMode: "modal" }}
          onReady={onReady}
          onSubmit={onSubmit}
          onError={onError}
        /> */}
        {/* {cargando && (
          <span className="text-sm text-orange-700 font-bold">Cargando...</span>
        )} */}
      </div>
    </div>
  );
};

export default Payment;

/**
 * CUENTAS DE PRUEBA
 *
 * COMPRADOR:
 *    - USERNAME: TEST_USER_2020951133
 *    - PASSWORD: NxqNQ8sD4E
 *
 * VENDEDOR:
 *    - USERNAME: TEST_USER_2109952451
 *    - PASSWORD: dJqrzvx9YU
 *
 *
 */
