import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserById } from "../Services/Users.service";
import type { UserFullType } from "../Types/user";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
import SearchMovie from "../Components/SearchMovie";
import { AddMovieToUser } from "../Services/Movies.service";
import '../App.css'

type OtherUserProps = {
    jwt: string
}
const OtherUser : React.FC<OtherUserProps> = ({jwt}) => {
    const { id } = useParams();
    const [userData, setUserData] = useState<UserFullType>({
        userName: '',
        id: '',
        userMovies: []
    });
    const [query, setQuery] = useState(''); // single source of truth type shit
    const [result, setResult] = useState('');

    useEffect(() => {
        if(typeof id == "string"){
            GetUserById(id, jwt)
            .then((data) => {
                console.log(data)
                setUserData(data)
            })
        }
    }, [result])

    function handleSubmit(){
            //Ok so i guess pass in the user as props to this method
            //And then boom you pass that in and then this will work (just call the add movie to other user endpoint on .net)
            //And then we get a movie recommendation app!
            AddMovieToUser(userData.userName, jwt, query)
            .then((data) => {
                if(typeof data == "string"){
                    setResult(data);
                } else {
                    setResult("Sucessfully added new movie.") // if its not a string it aint an error and i dont wanna deal with json types right now
                 }
            })
        }

    function changeQuery(queried: string){
        setQuery(queried);
    }
    console.log(userData)

    //Should i make an endpoint in my api for adding a movie thats like this?
    //if the movie exists in database, just add that directly, if not, scour the tmdb api to add that to our database
    //new endpoint --> no just populate the db w/ the top 100/1000 most popular movies and that will be fine for now, no point in allowing users to add to db
    return (
        <div className="other-user-page">
            <h1 className="other-user-username">{userData.userName}</h1>
            <h2 className="row-title">Movies they've watched</h2>
            <div className="movie-row">
                {userData.userMovies.map((movie : MovieType) => {
                    if(movie.status == 1){
                        return( // i could refactor this to map it once and then append it to seperate div arrays 
                            <Movie movie={movie} jwt={jwt} isOtherUserView={true}/>
                            //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                        )
                    }
                })}
            </div>
            <h2 className="row-title">Movies they've been recommened but HAVEN'T watched</h2>
            <div className="movie-row">
                {userData.userMovies.map((movie : MovieType) => {
                    if(movie.status == 0){
                        return(
                            <Movie movie={movie} jwt={jwt} isOtherUserView={true}/>
                            //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                        )
                    }
                })}
            </div>
            
            <h2>Add a movie recommendation to {userData.userName}!</h2>
            {result}
            <div className="add-movie-section">
                <SearchMovie changeQuery = {changeQuery} query={query}/>
                <button onClick={handleSubmit}> {/*Ideally refactor this to have this outside of this component and into the otherUser page instead so this becomes more versatile --> i did it now its better*/}
                    Submit Request!
                </button>
            </div>
        </div>
             
    )
}

export default OtherUser;