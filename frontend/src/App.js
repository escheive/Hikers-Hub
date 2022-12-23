
// DEPENDENCIES
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AddTrail from './pages/AddTrail';
import Hikes from './pages/Hikes';
// COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
// STYLES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // STATE
  const [trails, setTrails] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  
  
  // Grab trails from database
  // async function getIndexRoute() {
  //   const trailData = await axios.get("http://localhost:5001/trail")
  //   setTrails(trailData.data)
  // };

  // function to grab trails by state
  async function getTrails(region) {
    const allTrails = await axios.get(`http://localhost:5001/trail/${region}`)
    setTrails(allTrails.data)
}

  // Function to grab token from active user
  async function getUser(){
    const config = {
      headers:{
        'Authorization': localStorage.getItem('token')
      }
    };
    // Grab user data from database
    const userData = await axios.get("http://localhost:5001/user", config)
    // console.log(userData.data)
    console.log('working')
    setUser(userData.data)
  };

  // API REQUEST ON COMPONENT MOUNT
  useEffect(() => {
    // getIndexRoute()
    if(localStorage.token){
      getUser()
      setIsLoggedIn(true)
      console.log('logged in!')
    }
  }, [])


    // // redirect to home page if logged in
    // useEffect(() => {
    //     if (props.isLoggedIn) {
    //         navigate('/')
    //     }
    // }, [props.isLoggedIn])


  return (
    <div className="App">
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      
      <Routes>

        <Route
          path='/'
          element={ <Home getTrails={getTrails} /> }
        />

        <Route
          path='/login'
          element={ <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> }
        />

        <Route
          path='/signup'
          element={ <SignUp setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> }
        />

        <Route
          path='/addtrail'
          element={ <AddTrail /> }
        />

        <Route
          path='/hikes'
          element={ <Hikes trails={trails} /> }
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
