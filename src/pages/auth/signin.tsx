import { NextPage } from "next";
import JSXStyle from "styled-jsx/style";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    return <div>
        <form>
            <input type="email" placeholder="Please enter your email..."/>
            <input type="password" placeholder='Please enter your password...'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
}

export default SignIn