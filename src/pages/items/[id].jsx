import databaseQuery from "../../lib/db"
import Link from "next/link"
import checkToken from "../../scripts/checkToken"
import { useRouter } from "next/router"

const DisplayItem = (props) => {
    const router = useRouter()

const buyItemHandler = async() => {
    const buyItem = await fetch(`/api/items`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({data: {
            itemId: props.id,
            itemPrice: props.price,
            itemSeller: props.seller
        }
    }
    )
}   )    
   const response = await buyItem.json()
   console.log(response)
   if(response.message === "Updated"){
        router.push(`index`, `/`)
   }
}
return(
    <div>
        <p>{props.itemName}</p>
        <p>Price: {props.price} GRD</p> 
        <p>Seller: {props.seller}</p>
        <img src={props.image}/>

        {props.buyer != 'null' && <div>
            <p>Buyer: {props.buyer}</p> 
            <button type="button" onClick={buyItemHandler}>Buy</button>
            </div>} 
                         
        <Link href={'/'}>
        <button type="button">Return to homepage</button>
        </Link>
    </div>
    )
}

export default DisplayItem

export async function getServerSideProps({query}){
//   const token = await checkToken(query);
//   if (!token) {
//     return res.status(401).send({ error: "Unauthorized" });
//   }
    let itemId = query.id
  
    try{
        const getItem = await databaseQuery(`SELECT items.id AS id, itemName, image, price, username AS seller, buyer FROM items
        JOIN users 
        ON users.id=items.seller
        WHERE items.id= ?`, itemId);

        return {
            props: getItem[0]
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
            error: "Internal server error"
        }
    }
    }}
