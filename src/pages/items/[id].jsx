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
                    itemId: props.item.id,
                    itemPrice: props.item.price,
                    itemSeller: props.item.seller
                }
            })
        })    
        const response = await buyItem.json()

        if(response.message === "Updated"){
            router.push(`index`, `/`)
        } 
        else{
            return alert(`The item couldn't be purchased... aren't you too poor to buy this item?`)
        }
    }
   
    return(
        <div>
            <Link href={'/'}>
                <button type="button" className="text-base text-green-800 mt-5 mx-10 underline hover:text-green-600 focus:outline-none ease-linear transition-all duration-150"> ← Return to homepage</button>
            </Link>
            {props.item ?
                <div className="flex flex-col items-center">
                    <p className="p-5 text-3xl font-bold tracking-wide drop-shadow-lg text-center text-green-800">{props.item.itemName}
                    </p>
                    <div className="">
                        <img src={props.item.image} className="h-96 mx-auto"/>
                    </div>
                    <p className='mt-1'><u>Price:</u> {new Intl.NumberFormat().format(props.item.price)} GRD</p> 
                    <p><u>Seller:</u> {props.item.seller}</p>

                    {props.item.buyer == null ? 
                        <button type="button" onClick={buyItemHandler} className="mt-2 text-gray-100 bg-green-800 border  border-green-800 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 px-2 rounded-xl focus:outline-none ease-linear transition-all duration-150">Buy</button>
                        : <p>Buyer: {props.item.buyer} </p> 
                    }
                </div> 
                : <p>No item was found.</p> }
           
            {<div>
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
