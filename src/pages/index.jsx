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
    <div className="border-x-2 border-y-2 border-green-800">
      <h1 className="pt-5 gap-8 text-5xl font-bold tracking-wide drop-shadow-lg text-center text-green-800">Welcome to greenBay</h1>
      <button className="text-center" onClick={()=> {signIn()}}>Login</button>
    </div>
  )
}

export default HomePage