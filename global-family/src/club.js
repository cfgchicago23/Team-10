import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [], // Initialize an empty array to store the list of clubs
    };
  }

  addClub = () => {
    const newClub = {
      name: 'Club Name',
      description: 'Club Description',
      mentor_id: 1, // Replace with the ID of the mentor
      // Add other club-related data here
    };

    fetch('/api/clubs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClub),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
      })
      .catch((error) => {
        console.error('Error adding club:', error);
      });
  };

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
        <button onClick={this.addClub}>Add Club</button>
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