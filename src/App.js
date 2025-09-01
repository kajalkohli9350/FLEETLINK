
import './App.css';
import AddVehicle from './pages/AddVehicle';
import SearchAndBook from './pages/SearchAndBook';
import BookingList from './pages/BookingList';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route,Routes } from "react-router"
function App() {
  return (
<>
 
      <div className="container">
        <h2 className="title">FleetLink</h2>
       <AddVehicle />
       <SearchAndBook />
       <BookingList />
      </div>
</>
 
  );
}

export default App;
