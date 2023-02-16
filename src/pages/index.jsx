import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import AddItem from '@/components/AddItem'
import ListItems from '@/components/ListItems'


function HomePage() {
  const { data: session} = useSession()
  const [items, setItems] = useState([])

  if (session) {
    return (
    <div>
      <div className="flex pl-8 pt-5 gap-8 text-xl font-bold tracking-wider text-green-800">
        <p>Hi {session.user?.name}!</p>
        <button>Sell</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <AddItem setItems={setItems}/>
      <ListItems items={items} setItems={setItems}/>
    </div>

    )
  }
  return (
    <div>
      <h1 className="flex pl-8 pt-5 gap-8 text-xl font-bold tracking-wider text-green-800">Welcome to GreenBay</h1>
      <button onClick={()=> {signIn()}}>Login</button>
    </div>
  )
}

export default HomePage