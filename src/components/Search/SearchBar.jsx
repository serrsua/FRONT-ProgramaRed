import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters, getPostBySearch, getPostByQuery } from "../../redux/actions";
import { useSelector } from "react-redux";
import queryCreator from "./helper";
import Categories from "../Categories/Categories";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const filteredPosts = useSelector((state) => state.filteredPosts);
  const category = useSelector(state => state.category)

  useEffect(() => {
    return () => setSearch("");
  }, []);

  useEffect(() => {
    searchHandler ()
  }, [category]);

  const dispatch = useDispatch();

  const searchHandler = () => {
    if (filteredPosts.length) dispatch(clearFilters());
    if(category === "") dispatch(getPostBySearch(search))
    if(category !== ""){
      let query = queryCreator(search, category)
      dispatch(getPostByQuery(query))
    }

  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
    
    if (e.target.value.length <= 0) setShowCategories(false);
    else setShowCategories(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  }

  return (
    <>
    <div className="DIV_SEARCHBAR flex relative w-full border-b-2 border-teal-500 py-2 text-white my-4">
      <input
        className="bg-transparent w-full border-none mr-3 px-2 leading-tight font-medium focus:outline-none placeholder:text-white placeholder:opacity-60"
        type="text"
        placeholder="Buscar en ProgramaRed"
        name="search"
        value={search}
        onChange={changeHandler}
        onClick={(e)=>{
          if (e.target.value.length <= 0) setShowCategories(true);
          else setShowCategories(false);      
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={searchHandler}
        className="absolute right-0 top-0 mt-3 mr-4"
      >
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
    {showCategories && <Categories /> }
    </>
  );
};

export default SearchBar;
