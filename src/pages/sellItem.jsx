import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"

const SellItem = () => {
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
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                itemName: itemName,
                imageURL: imgURL,
                price: itemPrice
            }),
        }); 
            const data = await addItem.json()
            
            if(data.error) 
                return alert(data.error)

            if(addItem.status === 201){
                router.push(`items/[id]`, `/items/${data.newItem.id}`)
        
                setItemName('')
                setImgURL('')
                setItemPrice('')
            }
        } catch(error) {
            return alert(`Ooops... something went wrong 🤷 `)
        }
    }

    return (
    <div>
        <Link href={'/'}>
            <button className="text-green-800 mt-5 mx-10 underline hover:text-green-600 focus:outline-none ease-linear transition-all duration-150"> ← Return to Homepage</button>
        </Link>
        <form onSubmit = {addItemHandler} className="mx-10">

            <h4 className="my-5 text-small font-bold tracking-wider text-green-800">Add new item</h4>

            <label htmlFor="name" className="mx-1 text-small font-bold tracking-wider text-green-800">Name:</label>
                <input type='text' name='itemName' value={itemName} onChange={(e) => setItemName(e.target.value)} className="border m-1"/>

            <label htmlFor="imageURL" className="mx-1 text-small font-bold tracking-wider text-green-800">Image URL:</label>
                <input type='text' name='imgURL' value={imgURL} onChange={(e) => setImgURL(e.target.value)} className="border m-1"/>

            <label htmlFor="price" className="mx-1 text-small font-bold tracking-wider text-green-800">Price:</label>
                <input type='number' min='1' step="1" name='itemPrice' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="border m-1"/>

            <button className="text-gray-100 bg-green-800  mx-2 border border-green-800 hover:bg-emerald-600 hover:text-white active:bg-emerald-600  px-2 rounded-xl focus:outline-none ease-linear transition-all duration-150">Add</button>
        </form>
    </div>)
    }


export default SellItem