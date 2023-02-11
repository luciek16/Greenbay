import { useState } from "react"

const AddItem = () => {
    const [itemName, setItemName]= useState("")
    const [imageURL, setImgURL] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    const nameChangeHandler = (event)=>{
        setItemName(event.target.value)
    }
    const imageChangeHandler = (event)=>{
        setImgURL(event.target.value)
    }
    const priceChangeHandler = (event)=>{
        setItemPrice(event.target.value)
    }

    const addItemHandler = async(event) => {
        event.preventDefault();
 
            await fetch(`/api/addItem`, {
            method: "POST",
            body: JSON.stringify({
                itemName: itemName,
                imageURL: imageURL,
                price: itemPrice
            }),
            headers: {
              "content-type": "application/json",
            },
          }
      
    ).then(response=> response.json()).catch(error=> {console.log(error)})}
    return (<form onSubmit={addItemHandler}>
        <h4>Add new item</h4>

    <label htmlFor="name">Name </label>
        <input type='text' name='itemName' onChange={nameChangeHandler}/>

    <label htmlFor="imageURL">Image URL </label>
        <input type='text' name='imgURL' onChange={imageChangeHandler}/>
   
    <label htmlFor="price">Price </label>
        <input type='number' min='0.01' step="0.01" name='itemPrice' onChange={priceChangeHandler}/>
   
    <button>Add</button>
    </form>)
}

export default AddItem