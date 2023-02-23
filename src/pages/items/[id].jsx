import { useRouter } from "next/router"

const NewItem = () => {
    const router= useRouter()
    const {id, itemName, image, price}= router?.query;
    

return(
    <div>
    <ul className="grid grid-cols-2 gap-5">
      
            <li className="p-5">{itemName} {price} CZK <img src={image}/></li>
       
    </ul>
</div>
)
}

export default NewItem