import loading from "../images/Loading.gif";

const Loading = () => {
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden lg:col-span-2">
      <img src={loading} alt="" />
    </div>
}

export default Loading;