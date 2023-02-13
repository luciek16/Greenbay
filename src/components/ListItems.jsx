import { useState } from "react"

const ListItems = async () => {
    const [data, setData] = useState({})
    try{
    const getItems = await fetch('/api/items')
    const responseJSON = await getItems.json()
    
    // setData(responseJSON)
    console.log(responseJSON)
    // const data = await getItems.data
    // console.log(data)
    
   
    }catch(error){
        console.log(error)
    }
    return (
        <div>
            {/* <p>{data.items.map(item=> {item.itemName} {item.image})}</p> */}
                {/* {data.items.map(item=> <ul><li>{item.itemName}</li><li>{item.image}</li><li>{item.price}</li></ul>)} */}
            
        </div>
    )
}

export default ListItems