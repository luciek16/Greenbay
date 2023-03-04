import { useEffect } from "react"
import Link from "next/link"


const ListItems = ({items, setItems}) => {
    const fetchingItems = async () => {
        try {
            const getItems = await fetch('/api/items')
            const response = await getItems.json()
            setItems(response.data.items)

        } catch(error) {
            console.log("Ooops... something went wrong")
        }
    }

    useEffect(() => {
        fetchingItems()
    },[])

    if(items){
        return (
            <ul className="grid grid-cols-2 gap-5">
                {items.map((item) => (
                    <Link href={`/items/${item.id}`}>
                        <li key={item.id} className="grid grid-flow-col grid-cols-4 grid-rows-4 mx-5 my-1 p-2 max-h-60 bg-white border-2 border-green-800 rounded-lg shadow md:flex-row md:max-w-xl  hover:bg-emerald-400">
                            <p className="row-start-2 px-2">
                            {item.itemName}</p> 
                            <p className="row-start-3 px-2"> {new Intl.NumberFormat().format(item.price)} GRD</p> 
                            <img src={item.image} className="col-start-1 col-span-2 row-span-4 p-2 object-contain h-56 w-108"/>
                        </li>
                    </Link>
                ))}
            </ul>
        )
    }
    
    return(
        <p className="text-lg font-bold">Unable to load items</p>
    )
     
}

export default ListItems