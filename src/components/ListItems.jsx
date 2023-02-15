import { useEffect } from "react"

const ListItems = ({items, setItems}) => {
    const fetchingItems = async () => {
        console.trace()
        try {
            const getItems = await fetch('/api/items')
            const response = await getItems.json()
            setItems(response.data.items)

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
                {items.map((item)=>(
                    <li key={item.id} className="p-5">{item.itemName} {item.price} CZK <img src={item.image}/></li>
                ))}
            </ul>
        </div>
    )
}

    export default ListItems