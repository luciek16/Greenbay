import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import JSXStyle from "styled-jsx/style";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    const [userInfo, setUserInfo] = useState({email: '', password: ''})
    const submitHandler: FormEventHandler<HTMLFormElement>= (event) => {
        event.preventDefault()


    }
    return <div>
        <form onSubmit={submitHandler}>
            <input type="email" placeholder="Please enter your email..."/>
            <input type="password" placeholder='Please enter your password...'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
}

export default SignIn