import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";
import { getUserById } from "./../redux/actions";

const MP_PUBLIC_KEY = "APP_USR-2e62776c-c02a-41fc-8124-39dda16ba58b";
initMercadoPago(MP_PUBLIC_KEY, {
  locale: 'es-AR'
})

const Payment = () => {
 const dispatch = useDispatch();
 const user = useSelector((state) => state.actualUser);
 let userId = localStorage.getItem("id");
  
 useEffect(() => {
      dispatch(getUserById(userId));
  }, []);

  console.log(user)
  // const [preferenceId, setPreferenceId] = useState("");
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  const onSubmit = async () => {
    // callback llamado al hacer clic en Wallet Brick
    // esto es posible porque el ladrillo es un botón
    // en este momento del envío, debe crear la preferencia
    return new Promise((resolve, reject) => {
      setProcesando(true)
      axios.post('/subcriptions', {
        title: "Subscripcion Premium",
        description: "Pagar una subscripcion premium para poder publicar videos",
        price: 500,
        user: {
          username: "nicolas123",
          email: "juncosnicolas36@gmail.com"
        }
      })
        .then((response) => response.data)
        .then((data) => {
          // resolver la promesa con el ID de la preferencia
          // setInitialization({ preferenceId: data.preferenceId })
          resolve(data.preferenceId);
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear preferencia
          console.error(error);
          reject(error);
        }).finally(() => {
          setProcesando(false)
        })
    });
  };

  const onReady = () => {
    setCargando(false)
  }

  const onError = (error) => {
    console.error("Error:", error);
  }
  return (
    <div className="DIV_PREMIUM h-full w-full pt-10 row-span-3">
      <h2 className="text-center text-2xl font-bold mx-auto my-2">
          {user.isPremium===false ? (
          <>Aún no eres <a class="underline decoration-indigo-500/30">PREMIUM</a>😕</>
          ) : (
          <>Ya eres <a class="underline decoration-indigo-500/30">PREMIUM</a>😁</>
          )}
      </h2>
      <div id="wallet_container" className="w-3/4 bg-ligthGreen flex flex-col items-center gap-2 my-2 mx-auto p-5 rounded-40px" >
          {user.isPremium===false ? (
          <>
            <p>Hazte Premium para obtener beneficios adicionales en tu cuenta</p>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            </td>
            <td className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            </td>
          </tr>
          <tr>
            <td className=" ">Subir y descargar archivos</td>
            <td className=" ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </td>
            <td className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>  
            </td>
          </tr>
          <tr >
            <td className="">Publica videos y tutoriales</td>
            <td className=" ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </td> 
            <td className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            </td>
          </tr>
        </tbody>
        </table>
        </>
            ):(
          <>
            <p>Ya cuentas con estos beneficios adicionales en tu cuenta</p>
            <ul class="list-disc">
            <li>Subir y descargar archivos
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </li>
            <li>Publica videos y tutoriales
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </li>
            </ul>
            <h2 className="text-center text-2xl font-bold mx-auto my-2">Si deseas realizar otro pago no nos molestamos🤑</h2>
          </>  
          )}
        <Wallet
          customization={{ visual: { buttonBackground: "default", borderRadius: '8rem' } }}
          onReady={onReady}
          onSubmit={onSubmit}
          onError={onError}
        />
        {
          cargando && <span className="text-sm text-orange-700 font-bold">Cargando...</span>
        }
        {
          procesando && <span className="text-sm text-orange-700 font-bold">Procesando Pago...</span>
        }
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