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

    return (
        <div>
            <ul className="grid grid-cols-2 gap-5">
                {items.map((item)=> (item.sellable === 1 &&  
                    <Link href={`/items/${item.id}`}>
                    <li key={item.id} className="p-5">{item.itemName} {item.price} GRD <img src={item.image}/></li>
                    </Link>
                    ))}
            </ul>
        </div>
    )
  
}

    export default ListItems