import { useRouter } from "next/router"
import { useState } from "react"

const SellItem = ({}) => {
    const router = useRouter()
    const [itemName, setItemName]= useState("")
    const [imgURL, setImgURL] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    const addItemHandler = async(event) => {
        event.preventDefault();

    if (!itemName || ! imgURL || !itemPrice) {
        return alert('Missing some information')
    }
 
    try{
        const addItem = await fetch(`/api/items`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            itemName: itemName,
            imageURL: imgURL,
            price: itemPrice
        }),
    }); 

        const data = await addItem.json()

        if(data.error === "Image URL must a valid URL"){
            alert('Image URL must a valid URL')
        }
        
        if(addItem.status === 201){
        
                // setItems(prev => [
                //     ...prev,
                //  newwItem
                // ])
            router.push(`items/[id]`, `/items/${data.newItem.id}`)
            // , query: {
            //     id: data.newItem.id,
            //     itemName: data.newItem.itemName,
            //     image: data.newItem.imageURL,
            //     price: data.newItem.price
            // } });
            setItemName('')
            setImgURL('')
            setItemPrice('')
        }
    } catch(error){
        console.log(error)
        return alert(`Too bad, didn't work`)
    }

}

    return (<form onSubmit = {addItemHandler}>
        <h4 className="mx-10 text-small font-bold tracking-wider text-green-800">Add new item</h4>

    <label htmlFor="name" className="mx-10 text-small font-bold tracking-wider text-green-800">Name </label>
        <input type='text' name='itemName' value={itemName} onChange={(e) => setItemName(e.target.value)}/>

    <label htmlFor="imageURL" className="mx-10 text-small font-bold tracking-wider text-green-800">Image URL </label>
        <input type='text' name='imgURL' value={imgURL} onChange={(e) => setImgURL(e.target.value)}/>
   
    <label htmlFor="price" className="mx-10 text-small font-bold tracking-wider text-green-800">Price </label>
        <input type='number' min='0.01' step="0.01" name='itemPrice' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
   
    <button>Add</button>
    </form>)
}

export default SellItem