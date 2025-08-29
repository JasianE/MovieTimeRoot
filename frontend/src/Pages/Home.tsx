import React from "react";
import Login from "../Components/Login";
import SignUp from "../Components/Signup";

type HomeProps = {
    changeUserName: (change: string) => void;
    changeJwt: (change: string) => void;

}// gotta destructure the props ALWAYS
const Home: React.FC<HomeProps> = ({changeJwt, changeUserName}) => {

    return (
        <div>
            <h1>Hello, please log in or sign up.</h1>
            <Login changeJwt={changeJwt} changeUserName = {changeUserName}/>
            <SignUp changeJwt={changeJwt} changeUserName = {changeUserName}/>
        </div>
    )
}

export default Home;