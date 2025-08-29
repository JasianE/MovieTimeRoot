import React,{useEffect, useState} from "react";
import GetAllUserMovies from "../Services/UserMovie.service";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
import { useNavigate } from "react-router-dom";

import "../App.css"

type DashboardProps = {
    jwt: string
}

const Dashboard : React.FC<DashboardProps> = ({jwt}) => {
    const navigate = useNavigate();
    
    const [movies, setMovies] = useState([])
    const [forceResetCounter, setForceResetCounter] = useState(0);

    useEffect(() => {
        GetAllUserMovies(jwt)
        .then((stuff) => {
            setMovies(stuff);
        })
    }, [forceResetCounter])

    function refresh(){
        const newVal = forceResetCounter + 1;
        setForceResetCounter(newVal)
    }

    return(
        <div className="dashboard">
            <h2 className="row-title">Movies recommended to you that you havent watched:</h2>
            <div className="movie-row">
                {movies.map((movie : MovieType) => {
                    if(movie.status == 0){
                        return(<Movie movie={movie} jwt={jwt} refresh= {refresh}/>)
                    }
                })}
            </div>

            <h2 className="row-title">Movies recommended to you that you HAVE watched:</h2>
            <div className="movie-row">
                {movies.map((movie : MovieType) => {
                    if(movie.status == 1){
                        return(<Movie movie={movie} jwt={jwt} refresh={refresh}/>)
                    }
                })}
            </div>
            <button className= "users-button" onClick={() => {navigate('/Users')}}>Click me to recommend movies to other users</button>
        </div>
    )
}

export default Dashboard;