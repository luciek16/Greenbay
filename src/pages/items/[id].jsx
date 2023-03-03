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
            {props.item ?
                <div>
                    <p className="p-5 mt-10 text-5xl font-bold tracking-wide drop-shadow-lg text-center text-green-800">{props.itemName}</p>
                    <div className="">
                        <img src={props.item.image} className="h-96 mx-auto"/>
                    </div>
                    <p>Price: {new Intl.NumberFormat().format(props.item.price)} GRD</p> 
                    <p>Seller: {props.item.seller}</p>

                    {props.item.buyer == null ? 
                        <button type="button" onClick={buyItemHandler}>Buy</button>
                        : <p>Buyer: {props.item.buyer} </p> 
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
                props: { item: getItem[0]}
            }
        }
        else {
            return {
                props: { message: 'No item found'}   
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: { error: "Internal server error"}
        }
    }
}
