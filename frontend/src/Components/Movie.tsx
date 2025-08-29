import type { MovieType } from "../Types/movieTypes";
import "../App.css"
import { ChangeMovieStatus } from "../Services/Movies.service";

type movieProps = {
    movie: MovieType,
    jwt: string,
    refresh ? : () => void // optional method for changing status
    isOtherUserView ? : boolean
}

const Movie : React.FC<movieProps> = ({movie, jwt, refresh, isOtherUserView}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;

    function handleClick(){
        ChangeMovieStatus(movie.title, jwt)
        .then((data) => {
            console.log(data)
            if(refresh){
                refresh()
            }
        })
    }

    return (
        <div className="movie-card">
            <div className="movie-card-inner">
                {/* FRONT */}
                <div className="movie-card-front">
                <img src={imageUrl} alt={movie.title} />
                <h3>{movie.title}</h3>
                </div>

                {/* BACK */}
                <div className="movie-card-back">
                <h3>{movie.title}</h3>
                <p>{movie.overView}</p>
                {movie.status === 0 && (
                    isOtherUserView ? null : <button onClick={handleClick}>Watched!</button>
                )}
                </div>
            </div>
        </div>
    )
}

export default Movie;