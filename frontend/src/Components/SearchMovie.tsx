import { useState, useEffect } from "react";
import type { MovieType } from "../Types/movieTypes";
import { QueryMovies } from "../Services/Movies.service";

type SearchMovieProps = {
    query: string
    changeQuery: (queried: string) => void,
}
const SearchMovie : React.FC<SearchMovieProps> = ({changeQuery, query}) =>{
    const [results, setResults] = useState<MovieType[]>([]);
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => { // queries api on every search query change
        
        if(query.length < 2){
            setResults([]);
        } else {
            QueryMovies(query)
            .then((data) => {
                if(typeof data == "string"){
                    console.log("error")
                } else {
                    setResults(data ?? []) // if nothing, we don't set anything, done to bypass ts syntax (im evil)
                    setShowDropDown(true);
                }
            })
        }
    }, [query])

    return (
        <>
            <div className="search-dropdown">
            <input
                type="text"
                value={query}
                placeholder="Search movies..."
                onChange={(e) => changeQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setShowDropDown(true)}
                onBlur={() => setTimeout(() => setShowDropDown(false), 200)}
            />
    
            {showDropDown && results.length > 0 && (
                <ul>
                {results.map((movie) => (
                    <li
                    key={movie.title}
                    onMouseDown={() => {
                        changeQuery(movie.title);
                        setShowDropDown(false);
                    }}
                    >
                    {movie.title}
                    </li>
                ))}
                </ul>
            )}
            </div>
        </>
      );
    
    }

export default SearchMovie;