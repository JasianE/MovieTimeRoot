
async function GetAllUserMovies(jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(API_URL + "/api/usermovie", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });

    if(!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
}

export default GetAllUserMovies;