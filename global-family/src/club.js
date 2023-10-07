import React, { Component } from 'react';
<<<<<<< HEAD
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
=======
import './ClubList.css';

class ClubList extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [],
      isLoading: true,
      error: null,
      search: ''
    };
  }

  componentDidMount() {
    fetch('/api/clubs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ clubs: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    const { clubs, isLoading, error, search } = this.state;
    const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="club-container">
        <h1 className="club-header">Club List</h1>
        {isLoading && <p>Loading clubs...</p>}
        {error && <p>Error loading clubs: {error.message}</p>}
        <input 
          type="text" 
          placeholder="Search clubs..." 
          className="club-search"
          value={search}
          onChange={this.handleSearchChange}
        />
        <ul className="club-list">
          {filteredClubs.map((club) => (
            <li key={club.id} className="club-item">
              <h2>{club.name}</h2>
              {club.description && <p>{club.description}</p>}
            </li>
>>>>>>> a985a5032c1c18d8400778825ae19a50f09c98e8
          ))}
        </ul>
      </div>
    );
  }
}

<<<<<<< HEAD
export default App;
=======
export default ClubList;
>>>>>>> a985a5032c1c18d8400778825ae19a50f09c98e8
