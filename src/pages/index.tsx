import { signIn, signOut, useSession } from "next-auth/react"

function HomePage() {
  const { data: session} = useSession()
  if (session) {
    return (
      <div className="flex pl-8 gap-8 text-xl font-bold text-green-800">
        <p>Hi {session.user?.name}!</p>
        {session && <>
        <button>Sell</button>
        <button>Buy</button>
        </>}
        
        {/* <p>Current balance is {user?.credit}</p> */}
        <button onClick={() => signOut()}>Sign out</button>
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