import { useEffect, useState } from "react";
import Usercard from "../Components/Usercard";
import { GetAllUsers } from "../Services/Users.service";
import { useNavigate } from "react-router-dom";
import '../App.css'

type UsersProps = {
    jwt: string
    currentUserName: string
}

const Users : React.FC<UsersProps> = ({jwt, currentUserName}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        GetAllUsers(jwt)
        .then((data) => {
            setUsers(data);
        })
    }, []);

    function handleClick(userId: string){
        navigate(`/OtherUser/${userId}`)
    }
    return (
        <div>
            <button className="go-back-button" onClick={() => {navigate('/dashboard')}}>Go back</button>
            {users.map((user) => {
                if(user["userName"] != currentUserName){
                    return (
                        <Usercard user={user} handle={handleClick}/> // Maps all users in card for redirecting
                    )
                }
            })}
        </div>
    )
}

export default Users;