
// DEPENDENCIES
import { Routes, Route } from 'react-router-dom';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Hikes from './pages/Hikes';
// COMPONENTS
import Nav from './components/Nav';
import Footer from './components/Footer';
// STYLES
import './App.css';

function App() {


  return (
    <div className="App">
      <Nav />
      
      <Routes>

        <Route
          path='/'
          element={ <Home /> }
        />

        <Route
          path='/login'
          element={ <Login /> }
        />

        <Route
          path='/signup'
          element={ <SignUp /> }
        />

        <Route
          path='/hikes'
          element={ <Hikes /> }
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
