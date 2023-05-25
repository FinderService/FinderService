const ShowFilters = ({filterData, infoFilters, deleteFilter}) =>{
    return(<>
        <div className="font-bold mb-2 mt-5">{filterData.length} resultados encontrados</div>
        <div className="flex">
            {infoFilters.map((data)=>{
                return (<>
                    <div className="flex w-fit p-1 mr-1 rounded-xl border-2 border-black bg-red-200 hover:bg-neutral-200" key={data}>
                        <button value={data} onClick={deleteFilter}>❌️ {data}</button>
                    </div>
                </>)                               
            })}
        </div>
    </>)
}

export default ShowFilters;