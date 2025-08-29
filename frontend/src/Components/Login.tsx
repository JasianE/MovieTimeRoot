import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

type LoginProps = {
  changeJwt: (change: string) => void;
  changeUserName: (change: string) => void;
}

const Login : React.FC<LoginProps> = ({changeJwt, changeUserName}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState('');
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(API_URL + "/api/account/login", { // refactor this to put into services instead bruh
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        });

        if(!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Signup failed.")
        } else {
          const data = await res.json();
          changeJwt(data.token);
          changeUserName(formData.username);
          navigate("/dashboard");
        }
      } catch(err){
        setError("Error has occured.");
      }
    }
    return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Log in</h2>
    {error}
      
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enter the movie pit
        </button>
      </form>
    </div>
    )
}

export default Login