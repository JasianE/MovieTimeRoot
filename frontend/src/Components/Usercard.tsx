import type { UserBasicType } from "../Types/user";
import "../App.css"

type UserCardProps = {
    user: UserBasicType,
    handle: (userId : string) => void;
}

const Usercard: React.FC<UserCardProps> = ({user, handle}) => {
    return (
        <div className="user-card" onClick={() => {handle(user.id)}}> {/*Redirects to otheruser page to fetch more user data and display on dedicated page */}
            <h2>{user.userName}</h2>
        </div>
    )
}

export default Usercard;