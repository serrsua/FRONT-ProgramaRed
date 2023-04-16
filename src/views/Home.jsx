import { NavLink, useSearchParams } from "react-router-dom";
import Posts from "../components/Posts";
import { useDispatch } from "react-redux";
import { getAllPosts, getFavorites } from "../redux/actions";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

const Home = ({ toggleDetails }) => {
  const dispatch = useDispatch();
  const [searchParams, _] = useSearchParams()
  // const [initialization, setInitialization] = useState({ preferenceId: '' })
  const [message, setMessage] = useState("")
  const { user } = useAuth0();
  const [idUser, setIdUser] = useState("");
  // const posts = useSelector(state => state.posts)

  useEffect(() => {
    if (!localStorage.getItem("id")){
    async function fetchData() {
      try {
       let { data } = await axios(`/user/username/${user.nickname}`);
       setIdUser(data[0].id);
      }catch(e){
        console.log(e)
      } 
    }
    fetchData();
    }
  },[user])

  useEffect(() => {
    dispatch(getAllPosts()); 
    if (searchParams.get('status')
      && searchParams.get('payment_id')
      && localStorage.getItem('id')) {
      completePayment()
    }
  }, [dispatch]);

  let id
  if (!user) {
     id = localStorage.getItem("id");
  } else {
     id = idUser; //desde el estado
  }

  

  useEffect(()=>{
   // let id = localStorage.getItem("id");
    if (id) dispatch(getFavorites(id)); 
  },[id])

  const completePayment = async () => {
    try {
      
      const res = await axios.post('/payments', {
        paymentId: searchParams.get('payment_id'),
        productTitle: "Subscripcion Premium",
        price: 500 * 1.30,
        userId: Number(localStorage.getItem('id')),
        status: searchParams.get('status')
      })
      if (res.status === 200) {
        const {data}= await axios.get(`/user/${localStorage.getItem('id')}`)
        const response = await axios.post('/subcriptionsEmail', {
          username:data.username, 
          email:data.email,
          type:"Suscripcion" 
        })
        if (response.status===200){
          Swal.fire({
            icon: "success",
            title: res.data,
            text: response.data,
            showConfirmButton: true,
          })
        }else{
          Swal.fire({
            icon: "error",
            title: res.data,
            showConfirmButton: false,
            timer: 2000,
          })
        }
        searchParams.delete('status')
        searchParams.delete('payment_id')
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message)
    }
  }

  return (
    <>
      <div className="DIV_HOME flex justify-start flex-col items-center h-full overflow-hidden w-full relative">
        <SideBar />
        <NavLink
          to="/createPost"
          className="p-2 my-2 font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-130"
        >
          Sube un posteo
        </NavLink>

        {message && (
          <h3 className='text-xl text-green-700'>{message}</h3>
        )} 

        <Posts toggleDetails={toggleDetails} /> 
      </div>
    </>
  );
};

export default Home;
