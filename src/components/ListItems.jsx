import { useEffect, useState } from "react"

const ListItems = () => {
    const [items, setItems] = useState([])
    const fetchingItems = async () => {
        try {
            const getItems = await fetch('/api/items')
            const response = await getItems.json()
            const itemsData= response.data.items.map((data)=> { 
                return {
                id: data.id,
                itemName: data.itemName,
                price: data.price,
                image: data.image
            }})
            setItems(itemsData)
        
            console.log(itemsData)
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchingItems()
    },[])
    return (
        <div>
            <ul className="grid grid-cols-2 gap-5">
                <li>Nemám se rád</li>
                <li>Lucie, máš to rozbité</li>
                {items.map((item)=>(
                    <li key={item.id} className="p-5">{item.itemName} {item.price} CZK <img src={item.image}/></li>
                ))}
                <li>Lucie cpe async do react funkcí</li>
            </ul>
        </div>
    )
}

    export default ListItems