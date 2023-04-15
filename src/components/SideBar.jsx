import SearchBar from "./Search/SearchBar";


const SideBar = ()=>{

    return(
        <div className="DIV_SIDEBAR mt-2 flex justify-center bg-mediumGreen px-3 shadow-shadowBlack w-5/6">
            <div className="text-lg">
                <SearchBar/>
            </div>
        </div>
    )
}
//aca va la search bar y los favoritos guardados

export default SideBar;