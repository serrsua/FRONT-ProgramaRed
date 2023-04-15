const FalseScreen = ({ isView })=>{

    return(
        <>
            {
                isView ? (
                    <div className="DIV_FALSE_SCREEN absolute top-0 left-0 w-full h-full z-40 bg-slate-400 bg-opacity-90"></div>
                ) : ""
            }
        </>
    )
}

export default FalseScreen;