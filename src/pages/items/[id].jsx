import databaseQuery from "../../lib/db"
import Link from "next/link"
import { useRouter } from "next/router"

const DisplayItem = (props) => {
    const router = useRouter()

    const buyItemHandler = async() => {
        const buyItem = await fetch(`/api/items`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    itemId: props.id,
                    itemPrice: props.price,
                    itemSeller: props.seller
                }
            })
        })    
        const response = await buyItem.json()

        if(response.message === "Updated"){
            router.push(`index`, `/`)
        } 
        else{
            return alert(`The item couldn't be purchased`)
        }
    }
   
    return(
        <div>
            {props?
                <div>
                <p>{props.itemName}</p>
                <p>Price: {props.price} GRD</p> 
                <p>Seller: {props.seller}</p>
                <img src={props.image}/>

                {props.buyer == 'null'? 
                    <p>Buyer: {props.buyer} </p> 
                    : <button type="button" onClick={buyItemHandler}>Buy</button>
                }
                </div> 
                : <p>No item was found.</p> }
           
            {<div>
                <Link href={'/'}>
                    <button type="button">Return to homepage</button>
                </Link>
            </div>}
        </div>
    )
}

export default DisplayItem

export async function getServerSideProps({ query }){
    let itemId = query.id
  
    try{
        const getItem = await databaseQuery(`SELECT items.id AS id, itemName, image, price, username AS seller, buyer FROM items
            JOIN users 
            ON users.id=items.seller
            WHERE items.id= ?`, itemId);
        
        if(getItem.length){
            return {
                props: getItem[0]
            }
        }
        else {
            return {
                props: {message: 'No item found'}   
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
            error: "Internal server error"
            }
        }
    }
}
