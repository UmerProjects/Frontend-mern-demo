import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to the MERN CRUD App</h1>
    <Link to="/items">Go to Item List</Link>
  </div>
);

export default HomePage;
