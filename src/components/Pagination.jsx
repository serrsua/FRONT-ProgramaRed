export function Pagination({
    paginateBack,
    paginateFront }) {
    return (
        <div className='py-2'>
            <ul className="flex items-center justify-between">
                <li onClick={paginateBack} className="text-green-500 cursor-pointer hover:bg-green-500 hover:text-white border border-green-500 rounded-xl p-1 transition ease-out delay-75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </li>
                <li onClick={paginateFront} className="text-green-500 cursor-pointer hover:bg-green-500 hover:text-white border border-green-500 rounded-xl p-1 transition ease-out delay-75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </li>
            </ul>
        </div>
    )
}
