import { setCategory } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Categories = () => {

  const dispatch = useDispatch()

  const clicked = (event) => {
    dispatch(setCategory(event.target.name));
  }
  
    return (
      <div className="flex justify-evenly">
        <button className="px-3 py-2 bg-ligthGreen my-4 rounded-xl font-semibold transition-all hover:bg-darkGreen hover:scale-130 hover:text-white" name="user" onClick={clicked}>User</button>
        <button className="px-3 py-2 bg-ligthGreen my-4 rounded-xl font-semibold transition-all hover:bg-darkGreen hover:scale-130 hover:text-white" name="tag" onClick={clicked}>Tag</button>
        <button className="px-3 py-2 bg-ligthGreen my-4 rounded-xl font-semibold transition-all hover:bg-darkGreen hover:scale-130 hover:text-white" name="posts" onClick={clicked}>Post</button>
      </div>
    );
  };
  
  export default Categories;