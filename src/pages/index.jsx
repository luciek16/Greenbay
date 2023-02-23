import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import ListItems from '@/components/ListItems'


function HomePage() {
  const { data: session} = useSession()
  const [items, setItems] = useState([])
  const router= useRouter()

  if (session) {
    return (
    <div>
      <div className="flex pl-8 pt-5 gap-8 text-xl font-bold tracking-wider text-green-800">
        <p>Hi {session.user?.name}!</p>
        <button type='button' onClick={()=> router.push('/sellItem')}>Sell</button>
        <p>Green Dollars: </p> //todo: Fetch greenDollars
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      {/* <AddItem setItems={setItems}/> */}
      <ListItems items={items} setItems={setItems}/>
    </div>

    )
  }
  return (
    <div className="container grid place-items-center">
      <h1 className="p-5 mt-36 text-5xl font-bold tracking-wide drop-shadow-lg text-center text-green-800">Welcome to greenBay</h1>
      <button className="p-5 border-dotted items-center border h-12 mx-auto text-lg  border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase py-3 rounded-2xl focus:outline-none ease-linear transition-all duration-150" onClick={()=> {signIn()}}>Login</button>
    </div>
  )
}

export default HomePage