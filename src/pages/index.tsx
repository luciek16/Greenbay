import { signIn } from "next-auth/react"

function HomePage() {
  return (
    <div>
      <h1>Welcome to hellbuy</h1>
      <button onClick={()=> {signIn()}}>Login</button>
    </div>
  )
}

export default HomePage