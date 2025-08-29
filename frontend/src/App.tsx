import { useState } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import OtherUser from './Pages/OtherUser';

function App() {
  const [jwt, setJwt] = useState('');
  const [currentUserName, setCurrentUserName] = useState('')
  //TODO NOW! -- Features to be implemeneted (aug 20-22)
  //I need to make a feature to get ALL USERS and then make a user page, displaying that user's movies -- Done!
  //I ALSO need to add the feature of adding movies to another user --> Done!
  // I ALSO need to add the feature of changing a movie's status to watched (i think imma need to change the api) --> Done!

  //Todo (aug 22 - )
  //Redesign UI/ w/ css (chatgpt :P --> i hate css!!@!@!@#)
  //Create a docker file and hope shit doesn't break
  //Host locally on server
  //Done! :D

  //Refactors TODO
  //Need to refactor for keeping track of who recommended who what

  // Current bugs
  // In other users, the current user is also displayed --> Resolved!
  //In other users, if the movie is not watched you can also have them have it watched --> resolved! (w/ duct tape)
  //In your dashboard, it doesn't refresh, not a big deal but it would be nice to see it change IRL --> Finished! :D
  function ChangeJwt(change: string){
    setJwt(change);
  }

  function ChangeUserName(change : string){
    setCurrentUserName(change)
  }

  return (
    <>
      <Routes>
        <Route path="/" element = {<Home changeJwt={ChangeJwt} changeUserName = {ChangeUserName}/>} />
        <Route path = "/dashboard" element = { jwt ? <Dashboard jwt={jwt}/> : <Navigate to ="/"/>}/>
        <Route path = "/users" element = { jwt ? <Users jwt={jwt} currentUserName={currentUserName}/> : <Navigate to ="/"/>}/>
        <Route path = "/OtherUser/:id" element = {jwt ? <OtherUser jwt={jwt}/> : <Navigate to="/"/>}/>
      </Routes>
    </>
  )
}

export default App
