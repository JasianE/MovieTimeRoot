
export async function GetAllUsers(jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(API_URL + "/api/users/all", {
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

export async function GetUserById(id: string, jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/api/users/${id}`, {
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

