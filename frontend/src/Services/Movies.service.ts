import type { MovieType } from "../Types/movieTypes";

export async function QueryMovies(query: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try { 
        const res = await fetch(`${API_URL}/api/movie/all?title=${query}`);
        if (res.ok){
            const data: MovieType[] = await res.json();
            return data;
        }
    } catch(err){
        return("Error");
    }
}

export async function AddMovieToUser(userName : string , jwt: string, movieName: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
        const res = await fetch(API_URL +  '/api/usermovie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                userName: userName,
                movieName: movieName
            })
        })
        if(res.ok){
            return await res.json();
        } else {
            return await res.json();
        }
    } catch(err){
        return("Error");
    }
}

export async function ChangeMovieStatus(movieName: string, jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
        const res = await fetch(`${API_URL}/api/usermovie/update/${movieName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        })
        if(res.ok){
            return await res.json();
        } else {
            return await res.json();
        }
    } catch(err){
        return("Error");
    }
}