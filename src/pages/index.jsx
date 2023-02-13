import { signIn, signOut, useSession } from "next-auth/react"
import AddItem from '@/components/AddItem'
import ListItems from '@/components/ListItems'


function HomePage() {
  const { data: session} = useSession()
  if (session) {
    return (
    <div>
      <div className="flex pl-8 gap-8 text-xl font-bold text-green-800">
        <p>Hi {session.user?.name}!</p>
        <button>Sell</button>
        {/* <p>Current balance is {user?.credit}</p> */}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <AddItem/>
      <ListItems/>
    </div>

    )
  }
  return (
    <div>
      <h1>Welcome to hellbuy</h1>
      <button onClick={()=> {signIn()}}>Login</button>
    </div>
  )
}

export default HomePage