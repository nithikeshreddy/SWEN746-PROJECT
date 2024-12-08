import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cravemates_SignUp from './cravemates_SignUp';
import Cravemates_Login from './cravemates_Login';
import Dashboard from './Dashboard'
import Food_Items from './Food';
import Categories from './Categories';
import Settings from './Settings';
import Profile from './Profile';
import Orders from './Orders';
import Workshop from './Workshop';
import RecipeSharing from './ReciepeSharing';
const App = () => (
  <Router>
    <Routes>
      {/* Define the routes for your application */}
      <Route path="/signup" element={<Cravemates_SignUp />} />
      <Route path="/login" element={<Cravemates_Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/food' element={<Food_Items />} />
      <Route path='/category' element={<Categories />} />
      <Route path='/setting' element={<Settings />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/workshop' element={<Workshop />} />
      <Route path='/recipesharing' element={<RecipeSharing />} />
      <Route path="/" element={<h1>Welcome to Cravemates</h1>} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
