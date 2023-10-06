import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [], // Initialize an empty array to store the list of clubs
    };
  }

  componentDidMount() {
    // Fetch the list of clubs from your Flask API
    fetch('/api/clubs')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ clubs: data }); // Update the state with the fetched clubs
      })
      .catch((error) => {
        console.error('Error fetching clubs:', error);
      });
  }

  render() {
    const { clubs } = this.state;
    return (
      <div>
        <h1>Club List</h1>
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;