import { useState } from "react"

const AddItem = () => {
    const [itemName, setItemName]= useState("")
    const [imageURL, setImgURL] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    const addItemHandler = async(event) => {
        event.preventDefault();
 
        try{
            const addItem= await fetch(`/api/addItem`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                itemName: itemName,
                imageURL: imageURL,
                price: itemPrice
            }),

        }
       
        
    )
}catch(error){
     console.log(error)
     alert(`Too bad, didn't work`)
    }

    return (<form onSubmit = {addItemHandler}>
        <h4>Add new item</h4>

    <label htmlFor="name">Name </label>
        <input type='text' name='itemName' onChange={(e) => setItemName(e.target.value)}/>

    <label htmlFor="imageURL">Image URL </label>
        <input type='text' name='imgURL' onChange={(e) => setImgURL(e.target.value)}/>
   
    <label htmlFor="price">Price </label>
        <input type='number' min='0.01' step="0.01" name='itemPrice' onChange={(e) => setItemPrice(e.target.value)}/>
   
    <button>Add</button>
    </form>)
}}

export default AddItem