import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ListItems from './ListItems'

export default function UserPage({username}){
    const [items, setItems] = useState([])
    const [userDollars, setUserDollars] = useState('')
    const router= useRouter()
    
    const fetchDollars = async()=> {
        const dollarAmount = await fetch(`/api/user`)
        const response = await dollarAmount.json()
        setUserDollars(response.greenDollars)
      }
      
      useEffect(()=> {
          fetchDollars()
      },[])

    return (
        <div>
          <div className="grid grid-cols-2 pb-3">
            <div className="flex pl-8 pt-5 gap-8 text-xl font-bold tracking-wider items-baseline text-green-800">
              <p>Hi {username}!</p>
              <p className='text-base'>Green Dollars: {new Intl.NumberFormat().format(userDollars)} </p>
              <button type='button' onClick={()=> router.push('/sellItem')} className='text-base hover:text-emerald-600 underline'>Sell</button>
            </div>
            <div className="flex flex-row-reverse pt-3 pr-3">
              <button onClick={() => signOut()} className="px-1.5 font-bold text-sm text-green-800 mx-2 border border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 uppercase rounded-full focus:outline-none ease-linear transition-all duration-150">Sign out</button>
            </div>
          </div>
          <ListItems items={items} setItems={setItems}/>
        </div>
      )
    }


