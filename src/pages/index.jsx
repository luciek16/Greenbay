import { signIn, useSession } from "next-auth/react"
import UserPage from "../components/UserPage"

function Homepage() {
  const { data: session} = useSession()
 
    if (session) {
        return (
        <UserPage username={session.user.name}/>)}
     return(   
      <div className="container grid place-items-center">
        <h1 className="p-5 mt-36 text-5xl font-bold tracking-wide drop-shadow-lg text-center text-green-800">Welcome to greenBay</h1>
        <button className="px-4 items-center border h-12 mx-auto text-lg  border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase py-3 rounded-full focus:outline-none ease-linear transition-all duration-150" onClick={()=> {signIn()}}>Login</button>
      </div>
    )
}

export default Homepage