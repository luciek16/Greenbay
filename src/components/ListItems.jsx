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
         <div>
                <ul className="grid grid-cols-2 gap-5">
                    {items.map((item) => (item.sellable === 1 &&  
                        <Link href={`/items/${item.id}`}>
                        <li key={item.id} className="grid grid-flow-col grid-cols-4 mx-5 my-1 p-2 max-h-60 bg-white border-2 border-green-800 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-grays-100 dark:hover:bg-green-700"><p className="">{item.itemName}</p> <p className="col-span-1">{item.price} GRD</p> <img src={item.image} className="col-end-2 py-auto w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"/></li>
                        </Link>
                        ))}
                </ul>
            </div>
        )
    }
    else {
        return(
            <h4>Unable to load items.</h4>
        )
    } 
}

    export default ListItems