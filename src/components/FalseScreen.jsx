const FalseScreen = ({ isView, toggleDetails })=>{

    return(
        <>
            {
                isView ? (
                    <div onClick={toggleDetails} className="DIV_FALSE_SCREEN fixed top-0 left-0 w-full h-full z-40 bg-slate-400 bg-opacity-90"></div>
                ) : ""
            }
        </>
    )
}

export default FalseScreen;